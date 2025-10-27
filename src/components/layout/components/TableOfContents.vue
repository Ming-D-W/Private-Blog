<template>
	<aside
		v-if="shouldShowTOC && headings.length > 0"
		class="toc-container"
		:class="{ 'mobile-drawer': isMobileDrawerOpen }"
	>
		<!-- 移动端遮罩层 -->
		<div v-if="isMobileDrawerOpen" class="toc-overlay" @click="closeMobileDrawer"></div>

		<!-- TOC 内容 -->
		<nav class="toc-nav" ref="tocNav">
			<!-- 激活标记 -->
			<div class="outline-marker" ref="marker"></div>

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
			isMobile: false,
			isMobileDrawerOpen: false,
			scrollListener: null,
			resizeListener: null,
			cachedHeaderPositions: [],
		};
	},
	computed: {
		shouldShowTOC() {
			// 根据路由 meta 判断是否显示 TOC
			return this.$route.meta?.isMarkdown === true;
		},
	},
	mounted() {
		this.checkMobile();
		this.resizeListener = this.throttle(() => {
			this.checkMobile();
			this.cacheHeaderPositions();
		}, 200);
		window.addEventListener('resize', this.resizeListener);

		this.$nextTick(() => {
			this.extractHeadings();
			if (this.headings.length > 0) {
				this.setupScrollSpy();
			}
		});
	},
	beforeUnmount() {
		if (this.resizeListener) {
			window.removeEventListener('resize', this.resizeListener);
		}
		if (this.scrollListener) {
			window.removeEventListener('scroll', this.scrollListener);
		}
	},
	watch: {
		$route() {
			// 路由变化时重新提取标题
			this.$nextTick(() => {
				// 先移除旧的监听器
				if (this.scrollListener) {
					window.removeEventListener('scroll', this.scrollListener);
				}
				this.extractHeadings();
				if (this.headings.length > 0) {
					this.setupScrollSpy();
				}
			});
		},
	},
	methods: {
		/**
		 * 节流函数
		 */
		throttle(fn, delay) {
			let timer = null;
			return (...args) => {
				if (timer) return;
				timer = setTimeout(() => {
					fn.apply(this, args);
					timer = null;
				}, delay);
			};
		},

		/**
		 * 计算元素的绝对位置
		 */
		getAbsoluteTop(element) {
			let offsetTop = 0;
			while (element && element !== document.body) {
				if (element === null) {
					return NaN;
				}
				offsetTop += element.offsetTop;
				element = element.offsetParent;
			}
			return offsetTop;
		},

		/**
		 * 提取标题文本(忽略锚点等辅助元素)
		 */
		serializeHeader(heading) {
			let text = '';
			for (const node of heading.childNodes) {
				if (node.nodeType === 3) {
					// 文本节点
					text += node.textContent;
				} else if (node.nodeType === 1) {
					// 元素节点
					const classList = node.classList || [];
					// 忽略锚点和其他辅助元素
					if (!classList.contains('header-anchor') && !classList.contains('ignore-header')) {
						text += node.textContent;
					}
				}
			}
			return text.trim();
		},

		/**
		 * 更新激活标记位置
		 */
		updateMarker() {
			if (!this.$refs.marker || !this.$refs.tocNav) return;

			requestAnimationFrame(() => {
				const activeLink = this.$refs.tocNav.querySelector('.toc-item.active a');
				if (activeLink) {
					this.$refs.marker.style.top = activeLink.offsetTop + 6 + 'px';
					this.$refs.marker.style.opacity = '1';
				} else {
					this.$refs.marker.style.opacity = '0';
				}
			});
		},

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

		/**
		 * 提取页面标题
		 */
		extractHeadings() {
			const container = document.querySelector('.markdown-body');
			if (!container) {
				this.headings = [];
				return;
			}

			const headingElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
			this.headings = Array.from(headingElements)
				.filter(el => el.id && el.hasChildNodes()) // 过滤无 ID 和空标题
				.map(heading => ({
					id: heading.id,
					text: this.serializeHeader(heading),
					level: parseInt(heading.tagName.charAt(1)),
					element: heading,
				}));

			// 提取后缓存位置
			this.cacheHeaderPositions();
		},

		/**
		 * 缓存标题位置
		 */
		cacheHeaderPositions() {
			this.cachedHeaderPositions = this.headings.map(h => ({
				id: h.id,
				top: this.getAbsoluteTop(h.element),
			}));
		},
		/**
		 * 设置滚动监听
		 */
		setupScrollSpy() {
			const navHeight = 80; // 导航栏高度

			const onScroll = () => {
				const scrollY = window.scrollY;
				const innerHeight = window.innerHeight;
				const offsetHeight = document.body.offsetHeight;
				const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

				// 使用缓存的位置信息
				const headers = this.cachedHeaderPositions
					.filter(({ top }) => !isNaN(top))
					.sort((a, b) => a.top - b.top);

				if (!headers.length) {
					this.activeId = '';
					this.updateMarker();
					return;
				}

				// 页面顶部
				if (scrollY < 1) {
					this.activeId = '';
					this.updateMarker();
					return;
				}

				// 页面底部 - 高亮最后一个链接
				if (isBottom) {
					this.activeId = headers[headers.length - 1].id;
					this.updateMarker();
					return;
				}

				// 找到视口上方最近的标题
				let activeId = '';
				for (const { id, top } of headers) {
					if (top > scrollY + navHeight + 4) {
						break;
					}
					activeId = id;
				}
				this.activeId = activeId;
				this.updateMarker();
			};

			// 使用节流函数
			this.scrollListener = this.throttle(onScroll, 100);
			window.addEventListener('scroll', this.scrollListener);

			// 初始化时执行一次
			requestAnimationFrame(onScroll);
		},
		/**
		 * 处理锚点点击
		 */
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
				this.$router.replace({ path: this.$route.path, hash: `#${id}` });
				// 更新激活状态
				this.activeId = id;
				this.updateMarker();
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
	top: 0px;
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
	position: relative;
	background: #fff;
	border-radius: 8px;
	border: 1px solid #e4e7ed;
	border-left: 1px solid #e4e7ed;
	padding: 16px;
	padding-left: 16px;
}

/* 激活标记 */
.outline-marker {
	position: absolute;
	top: 32px;
	left: -1px;
	z-index: 0;
	opacity: 0;
	width: 2px;
	border-radius: 2px;
	height: 18px;
	background-color: #409eff;
	transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), opacity 0.25s;
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
		transition: color 0.2s;
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
