<template>
	<aside v-if="headings.length > 0" class="toc-container" :class="{ 'mobile-drawer': isMobileDrawerOpen }">
		<!-- 移动端遮罩层 -->
		<div v-if="isMobileDrawerOpen" class="toc-overlay" @click="closeMobileDrawer"></div>

		<!-- TOC 内容 -->
		<nav class="toc-nav">
			<div class="toc-header">
				<span class="toc-title">目录</span>
				<button v-if="isMobile" class="toc-close-btn" @click="closeMobileDrawer">
					<i class="el-icon-close"></i>
				</button>
			</div>
			<ul class="toc-list">
				<li
					v-for="heading in headings"
					:key="heading.id"
					:class="['toc-item', `toc-level-${heading.level}`, { active: activeId === heading.id }]"
				>
					<a :href="`#${heading.id}`" @click="handleAnchorClick($event, heading.id)">
						{{ heading.text }}
					</a>
				</li>
			</ul>
		</nav>

		<!-- 移动端浮动按钮 -->
		<button v-if="isMobile && !isMobileDrawerOpen" class="toc-mobile-btn" @click="openMobileDrawer">
			<i class="el-icon-menu"></i>
			<span>目录</span>
		</button>
	</aside>
</template>

<script>
export default {
	name: 'TableOfContents',
	data() {
		return {
			headings: [],
			activeId: '',
			observer: null,
			isMobile: false,
			isMobileDrawerOpen: false,
		};
	},
	mounted() {
		this.checkMobile();
		window.addEventListener('resize', this.checkMobile);
		this.$nextTick(() => {
			this.extractHeadings();
			if (this.headings.length > 0) {
				this.setupScrollSpy();
			}
		});
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.checkMobile);
		if (this.observer) {
			this.observer.disconnect();
		}
	},
	watch: {
		'$route'() {
			// 路由变化时重新提取标题
			this.$nextTick(() => {
				this.extractHeadings();
				if (this.headings.length > 0) {
					this.setupScrollSpy();
				}
			});
		},
	},
	methods: {
		checkMobile() {
			this.isMobile = window.innerWidth < 768;
			if (!this.isMobile) {
				this.isMobileDrawerOpen = false;
			}
		},
		openMobileDrawer() {
			this.isMobileDrawerOpen = true;
			document.body.style.overflow = 'hidden';
		},
		closeMobileDrawer() {
			this.isMobileDrawerOpen = false;
			document.body.style.overflow = '';
		},
		extractHeadings() {
			const container = document.querySelector('.markdown-body');
			if (!container) {
				this.headings = [];
				return;
			}

			const headingElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
			this.headings = Array.from(headingElements).map((heading) => ({
				id: heading.id,
				text: heading.textContent,
				level: parseInt(heading.tagName.charAt(1)),
				element: heading,
			}));
		},
		setupScrollSpy() {
			// 断开之前的观察器
			if (this.observer) {
				this.observer.disconnect();
			}

			// 创建 IntersectionObserver
			this.observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							this.activeId = entry.target.id;
						}
					});
				},
				{
					rootMargin: '-80px 0px -80% 0px',
					threshold: 0,
				},
			);

			// 观察所有标题元素
			this.headings.forEach((h) => {
				if (h.element) {
					this.observer.observe(h.element);
				}
			});
		},
		handleAnchorClick(event, id) {
			event.preventDefault();
			const element = document.getElementById(id);
			if (element) {
				// 平滑滚动到目标元素
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				// 更新 URL hash
				window.history.pushState(null, '', `#${id}`);
				// 更新激活状态
				this.activeId = id;
				// 关闭移动端抽屉
				if (this.isMobile) {
					this.closeMobileDrawer();
				}
			}
		},
	},
};
</script>

<style scoped lang="scss">
/* 桌面端 TOC 样式 */
.toc-container {
	width: 250px;
	position: sticky;
	top: 80px;
	max-height: calc(100vh - 100px);
	overflow-y: auto;
	padding: 16px 0;

	/* 隐藏滚动条但保持可滚动 */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Edge */
	}
}

.toc-nav {
	background: #fff;
	border-radius: 8px;
	border: 1px solid #e4e7ed;
	padding: 16px;
}

.toc-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid #e4e7ed;
}

.toc-title {
	font-size: 14px;
	font-weight: 600;
	color: #303133;
}

.toc-close-btn {
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px;
	color: #909399;
	font-size: 18px;

	&:hover {
		color: #303133;
	}
}

.toc-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.toc-item {
	margin: 0;
	line-height: 1.7;

	a {
		display: block;
		padding: 4px 0;
		color: #606266;
		text-decoration: none;
		font-size: 13px;
		transition: all 0.2s;
		border-left: 2px solid transparent;
		padding-left: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&:hover {
			color: #409eff;
		}
	}

	&.active > a {
		color: #409eff;
		font-weight: 500;
		border-left-color: #409eff;
	}
}

/* 不同层级的缩进 */
.toc-level-1 {
	padding-left: 0;
}

.toc-level-2 {
	padding-left: 0;
}

.toc-level-3 {
	padding-left: 16px;
}

.toc-level-4 {
	padding-left: 32px;
}

.toc-level-5 {
	padding-left: 48px;
}

.toc-level-6 {
	padding-left: 64px;
}

/* 移动端浮动按钮 */
.toc-mobile-btn {
	display: none;
}

/* 移动端样式 (< 768px) */
@media (max-width: 767px) {
	.toc-container {
		position: fixed;
		top: auto;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		max-height: 70vh;
		background: #fff;
		border-radius: 16px 16px 0 0;
		box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
		transform: translateY(100%);
		transition: transform 0.3s ease;
		z-index: 1000;
		padding: 0;

		&.mobile-drawer {
			transform: translateY(0);
		}
	}

	.toc-nav {
		border: none;
		border-radius: 0;
		max-height: 70vh;
		overflow-y: auto;
	}

	.toc-close-btn {
		display: block;
	}

	.toc-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.toc-mobile-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		position: fixed;
		bottom: 24px;
		right: 24px;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: #409eff;
		color: #fff;
		border: none;
		box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
		cursor: pointer;
		z-index: 998;
		flex-direction: column;
		font-size: 12px;
		transition: all 0.3s;

		i {
			font-size: 20px;
		}

		&:hover {
			transform: scale(1.05);
			box-shadow: 0 6px 16px rgba(64, 158, 255, 0.5);
		}

		&:active {
			transform: scale(0.95);
		}
	}
}
</style>

