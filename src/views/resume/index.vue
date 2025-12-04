<template>
	<div>
		<div class="content" id="content">
			<header class="content-hd">
				<section class="title">
					<div class="name">
						{{ personalInfo.name }}
					</div>
					<div class="job">
						<h2>
							{{ personalInfo.job }}<small> / {{ personalInfo.location }}</small>
						</h2>
					</div>
				</section>
				<section class="info">
					<h2>{{ personalInfo.info.gender }} / {{ personalInfo.info.birth }}</h2>
					<h3>
						{{ personalInfo.info.education }} ·
						{{ personalInfo.info.experience }}
					</h3>
					<h3>{{ personalInfo.info.school }}</h3>
				</section>
				<section class="contact">
					<ul>
						<li>
							<a
								><span class="contact-link">{{ personalInfo.contact.phone }}</span>
								<i class="icon icon-weChat"></i>&nbsp;&
								<i class="icon icon-phone"></i>
							</a>
						</li>
						<li>
							<a
								><span class="contact-link">{{ personalInfo.contact.email }}</span>
								<i class="icon icon-mail"></i
							></a>
						</li>
					</ul>
				</section>
			</header>
			<div class="content-bd">
				<!--      技术栈-->
				<section id="skillStack">
					<header class="section-hd">
						<span class="section-title-l"></span>
						<h2 class="section-title">技术栈</h2>
						<span class="section-title-r"></span>
					</header>
					<div class="mt-24 flex-row-center-between">
						<div
							v-for="item in personalInfo.technologyStack"
							:key="item"
							class="p-8 radius-6"
							style="color: #fff; background-color: #00b38a"
						>
							{{ item }}
						</div>
					</div>
				</section>
				<!--        个人能力-->
				<section id="skill">
					<header class="section-hd">
						<span class="section-title-l"></span>
						<h2 class="section-title">个人能力</h2>
						<span class="section-title-r"></span>
					</header>
					<div class="section-bd">
						<div class="section-list">
							<div v-for="item in personalInfo.personalAbility" :key="item" class="mb-4">
								<div class="section-content flex-row-align-center">
									<i class="icon icon-dot"></i>
									<p v-html="formatText(item)"></p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<!--      工作经历-->
				<section id="practice">
					<header class="section-hd">
						<span class="section-title-l"></span>
						<h2 class="section-title">工作经历</h2>
						<span class="section-title-r"></span>
					</header>
					<div class="section-bd">
						<div v-for="item in personalInfo.workExperience" :key="item.company">
							<div class="item-main">
								<header class="item-hd">
									<h3 class="item-name">
										{{ item.company }}
									</h3>
									<a class="btn item-more"> 离职 </a
									><span class="" style="float: right">{{ item.duration }}</span>
								</header>
							</div>
							<div class="item">
								<header class="item-hd" style="font-weight: normal">
									<h3 class="item-name">
										<i class="icon icon-dot"></i>
										负责公司核心产品（如Web应用/管理后台/H5页面）的前端架构设计与功能开发，实现用户交互模块，完成登录系统、数据可视化大屏、动态表单等复杂功能，通过组件化重构老项目代码，降低维护成本。
									</h3>
								</header>
								<header class="item-hd">
									<h3 class="item-name" style="font-weight: normal">
										<i class="icon icon-dot"></i>
										与产品经理、UI设计师紧密合作，将设计稿转化为高保真前端页面，确保像素级还原并优化交互细节。与后端团队联调接口，设计前端数据层方案，提升接口响应效率。
									</h3>
								</header>
							</div>
						</div>
					</div>
				</section>
				<!--      重点项目经历-->
				<section id="experience">
					<header class="section-hd">
						<span class="section-title-l"></span>
						<h2 class="section-title">重点项目经历</h2>
						<span class="section-title-r"></span>
					</header>
					<div
						class="section-bd"
						v-for="item in personalInfo.keyProjectExperience"
						:key="item.name"
					>
						<div class="item item-main">
							<header class="item-hd">
								<h3 class="item-name">{{ item.name }}</h3>
							</header>
						</div>
						<div class="item">
							<header class="item-hd">
								<h3 class="item-name">项目介绍：</h3>
								<p style="font-weight: normal">
									{{ item.description }}
								</p>
							</header>
							<div class="item-hd">
								<h3 class="item-name">项目贡献：</h3>
							</div>
							<div class="item-bd">
								<p
									v-for="itemContent in item.achievements"
									:key="itemContent"
									class="section-content"
								>
									<i class="icon icon-dot"></i>
									{{ itemContent }}
								</p>
							</div>
						</div>
					</div>
				</section>
				<!--      自我评价-->
				<section id="skillStack">
					<header class="section-hd">
						<span class="section-title-l"></span>
						<h2 class="section-title">自我评价</h2>
						<span class="section-title-r"></span>
					</header>
					<div class="mt-24">
						<p v-for="item in personalInfo.selfEvaluation" :key="item" class="section-content">
							<i class="icon icon-dot"></i>
							{{ item }}
						</p>
					</div>
				</section>
			</div>
			<div v-if="showPasswordMask" class="resume-mask-overlay">
				<div class="resume-mask-dialog">
					<div class="resume-mask-title">
						请输入密<span class="resume-mask-ma" @click="handleMaClick">码</span>
					</div>
					<div class="resume-mask-desc">此页面已加密，请输入密码访问。</div>
					<div class="resume-mask-input">
						<span class="resume-mask-input-placeholder">请输入密码</span>
					</div>
					<div class="resume-mask-actions">
						<button type="button" class="resume-mask-button">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showPasswordMask: true,
			maClickCount: 0,
			personalInfo: {
				name: '吴万明',
				job: '前端开发工程师',
				location: '成都',
				info: {
					gender: '男',
					birth: '1998.04',
					education: '本科（全日制）',
					experience: '',
					school: '嘉兴大学 · 软件工程',
				},
				contact: {
					phone: '18058619311',
					email: 'wuwanming0405@163.com',
				},
				technologyStack: [
					'HTML5',
					'CSS3',
					'JavaScript',
					'Vue.js',
					'TypeScript',
					'Node.js',
					'Webpack',
					'Vite',
				],
				personalAbility: [
					'掌握**HTML5**、**CSS3**、**JavaScript**等前端技术，并且熟练运用**Vue**框架及周边生态。有扎实的编程基础和良好的设计模式编程思想，能独立完成复杂模块的设计和落地。',
					'熟悉**TypeScript**，能使用其进行类型安全的前端开发，提升代码的可维护性和可读性。',
					'熟悉**Node.js**，能使用其进行前端构建工具的开发和维护，提升前端开发效率。',
					'熟悉**Webpack**、**Vite**等前端构建工具，能进行前端项目的打包、优化和部署。',
				],
				workExperience: [
					{
						company: '科技股份有限公司',
						duration: '2022.06 - 2025.04',
						responsibilities: [
							'负责公司核心产品（如Web应用/管理后台/H5页面）的前端架构设计与功能开发，实现用户交互模块，完成登录系统、数据可视化大屏、动态表单等复杂功能，通过组件化重构老项目代码，降低维护成本。',
							'与产品经理、UI设计师紧密合作，将设计稿转化为高保真前端页面，确保像素级还原并优化交互细节。与后端团队联调接口，设计前端数据层方案，提升接口响应效率。',
						],
					},
					{
						company: '科技股份有限公司',
						duration: '2022.06 - 2025.04',
						responsibilities: [
							'负责公司核心产品（如Web应用/管理后台/H5页面）的前端架构设计与功能开发，实现用户交互模块，完成登录系统、数据可视化大屏、动态表单等复杂功能，通过组件化重构老项目代码，降低维护成本。',
							'与产品经理、UI设计师紧密合作，将设计稿转化为高保真前端页面，确保像素级还原并优化交互细节。与后端团队联调接口，设计前端数据层方案，提升接口响应效率。',
						],
					},
				],
				keyProjectExperience: [
					{
						name: '能效监管系统',
						description:
							'本项目是一款能源管理系统，提供总览、负荷曲线、用量统计、用量分析、用量考核、计费收费、设备监控、管理设置等功能模块，帮助用户实时监测能源消耗、优化用能策略，实现精准计费与设备管理。',
						achievements: [
							'针对大数据量的长列表问题，通过实现只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。',
							'实施了代码分割与懒加载策略，显著减少了应用的初始加载时间。对图片、字体等静态资源进行了深度压缩与优化，进一步提升了页面加载速度与整体性能。',
							'对 axios 进行二次封装，编写请求缓存逻辑，有效提升数据请求效率；同时实现并发限制功能，确保在高并发场景下系统的稳定性与响应性能。',
							'针对前端权限管理问题，提供一套全面且细致的解决方案。该方案覆盖路由、菜单、组件、模块以及业务等多个维度，通过精准的权限控制规则和灵活的配置机制，确保系统资源仅被授权用户访问。',
						],
					},
					{
						name: '能效监管系统',
						description:
							'本项目是一款能源管理系统，提供总览、负荷曲线、用量统计、用量分析、用量考核、计费收费、设备监控、管理设置等功能模块，帮助用户实时监测能源消耗、优化用能策略，实现精准计费与设备管理。',
						achievements: [
							'针对大数据量的长列表问题，通过实现只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。',
							'实施了代码分割与懒加载策略，显著减少了应用的初始加载时间。对图片、字体等静态资源进行了深度压缩与优化，进一步提升了页面加载速度与整体性能。',
							'对 axios 进行二次封装，编写请求缓存逻辑，有效提升数据请求效率；同时实现并发限制功能，确保在高并发场景下系统的稳定性与响应性能。',
							'针对前端权限管理问题，提供一套全面且细致的解决方案。该方案覆盖路由、菜单、组件、模块以及业务等多个维度，通过精准的权限控制规则和灵活的配置机制，确保系统资源仅被授权用户访问。',
						],
					},
				],
				selfEvaluation: [
					'学习是人生任务，在工作中学习，在学习中工作；闲暇之余也会读技术博客学习一些其他技术栈的东西；除此之外个人抗 压能力比较强的。',
					'工作态度以及团队协作：不喜欢拖沓，今日事，今日毕；在部门中口碑很好，和同事们相处的很融洽，协作也比较愉快。',
				],
			},
		};
	},
	methods: {
		formatText(text) {
			return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		},
		handleMaClick() {
			if (!this.showPasswordMask) {
				return;
			}
			this.maClickCount += 1;
			if (this.maClickCount >= 5) {
				this.showPasswordMask = false;
				this.maClickCount = 0;
			}
		},
	},
	computed: {},
};
</script>
<style src="./main.css" scoped></style>
