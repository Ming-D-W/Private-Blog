<template>
	<div
		class="yx-border radius-4 content mb-24 demo-block"
		:class="[blockClass, { hover: hovering }]"
		@mouseenter="hovering = true"
		@mouseleave="hovering = false"
	>
		<div class="bgcolor-gy-2 pt-6 pb-6 pl-16">
			<i class="icon" v-for="icon in iconColorArr" :key="icon.color" :style="{ backgroundColor: icon.color }"></i>
		</div>
		<div class="p-24">
			<slot name="source"></slot>
		</div>
		<div class="meta" ref="meta">
			<div class="code-content" ref="codeContent">
				<slot name="highlight"></slot>
			</div>
		</div>
		<div
			class="demo-block-control"
			:class="{ 'is-fixed': fixedControl }"
			:style="{ width: fixedControl ? `${codeContentWidth}px` : 'unset' }"
			ref="control"
			@click="isExpanded = !isExpanded"
		>
			<transition name="arrow-slide">
				<i :class="[iconClass, { hovering: hovering }, 'icon']"></i>
			</transition>
			<transition name="text-slide">
				<span v-show="hovering">{{ controlText }}</span>
			</transition>
			<span v-show="hovering && !copied" :class="['copy-action', { 'copying ': copied }]" @click.stop="copyCode">{{ copiedText }}</span>
			<transition name="bounce">
				<span v-show="copied" class="copy-action copy-action-success">{{ copiedText }}</span>
			</transition>
		</div>
	</div>
</template>

<script>
import defaultLang from './i18n/default_lang.json';
export default {
	data() {
		return {
			iconColorArr: [
				{ name: '', color: '#fe5f57' },
				{ name: '', color: '#ffbc2d' },
				{ name: 'scale', color: '#27c83e' },
			],
			hovering: false,
			copied: false,
			isExpanded: false,
			fixedControl: false,
			codeContentWidth: 0,
			scrollParent: null,
		};
	},
	props: {
		options: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		compoLang() {
			return defaultLang;
		},
		langConfig() {
			return this.compoLang.find(config => config.lang === 'zh-CN')['demo-block'];
		},
		blockClass() {
			return `demo-zh-CN`;
		},
		iconClass() {
			return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
		},
		controlText() {
			return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
		},
		copiedText() {
			return this.copied ? this.langConfig['copy-success'] : this.langConfig['copy-text'];
		},
		codeArea() {
			return this.$refs.meta;
		},
		codeDescription() {
			return this.$refs.description;
		},
		codeContent() {
			return this.$refs.codeContent;
		},
		codeControl() {
			return this.$refs.control;
		},
		codeAreaHeight() {
			if (this.codeDescription) {
				return this.codeDescription.clientHeight + this.codeContent.clientHeight + 20;
			}
			return this.codeContent.clientHeight;
		},
	},
	methods: {
		copyCode() {
			if (this.copied) {
				return;
			}
			const pre = this.$el.querySelectorAll('pre')[0];
			pre.setAttribute('contenteditable', 'true');
			pre.focus();
			document.execCommand('selectAll', false, null);
			this.copied = document.execCommand('copy');
			pre.removeAttribute('contenteditable');
			setTimeout(() => {
				this.copied = false;
			}, 1500);
		},
		scrollHandler() {
			const { top, bottom, left } = this.codeArea.getBoundingClientRect();
			const documentClientHeight = document.documentElement.clientHeight;
			this.fixedControl = Number(bottom) > Number(documentClientHeight) && Number(top) + 44 <= Number(documentClientHeight);
			this.codeControl.style.left = this.fixedControl ? `${left}px` : '0';
		},
		removeScrollHandler() {
			this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
		},
	},
	watch: {
		isExpanded(val) {
			this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0';
			if (!val) {
				this.fixedControl = false;
				this.codeControl.style.left = '0';
				this.removeScrollHandler();
				return;
			}
			setTimeout(() => {
				this.scrollParent = document;
				this.scrollParent.querySelector('.el-main').addEventListener('scroll', this.scrollHandler);
				this.scrollHandler();
			}, 200);
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.codeContentWidth = this.$el.offsetWidth;
			if (!this.codeDescription) {
				this.codeContent.style.width = '100%';
				this.codeContent.borderRight = 'none';
			}
		});
	},
	beforeUnmount() {
		this.removeScrollHandler();
	},
};
</script>
<style scoped lang="scss">
.demo-block {
	transition: 0.2s;
	&.hover {
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
	}
	.icon {
		position: relative;
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 6px;
		border-radius: 50%;
	}
	code {
		font-family: Menlo, Monaco, Consolas, Courier, monospace;
	}
	.demo-button {
		float: right;
	}
	.meta {
		background-color: #f6f8fa;
		height: 0;
		overflow: hidden;
		transition: height 0.2s;
	}
	.description {
		box-sizing: border-box;
		color: #666;
		word-break: break-word;
		background-color: #fff;
	}
	.demo-block-control {
		border-top: solid 1px #eaeefb;
		height: 44px;
		box-sizing: border-box;
		background-color: #fff;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		text-align: center;
		margin-top: -2px;
		color: #d3dce6;
		cursor: pointer;
		position: relative;
		&.is-fixed {
			position: fixed;
			bottom: 0;
			width: 660px;
			z-index: 999;
		}
		i {
			font-size: 16px;
			line-height: 44px;
			transition: 0.3s;
			&.hovering {
				transform: translateX(-40px);
			}
		}
		& > span {
			position: absolute;
			transform: translateX(-30px);
			font-size: 14px;
			line-height: 44px;
			transition: 0.3s;
			display: inline-block;
		}
		.copy-action {
			right: 0px;
			color: #7052ff;
		}
		&.copying {
			transform: translateX(-44px);
		}
		.copy-action-success {
			color: #67c23a;
		}
		&:hover {
			color: #7052ff;
			background-color: #f7f8fa;
		}
		.bounce-enter-active {
			animation: bounce-in 0.5s;
		}
	}
}
.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
	opacity: 0;
	transform: translateX(10px);
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}
</style>

