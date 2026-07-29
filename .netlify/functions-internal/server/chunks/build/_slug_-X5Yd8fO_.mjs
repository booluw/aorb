import { u as useRoute$1, a as useHead$1, N as NuxtLink } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

//#region utils/encode.js
var KEY = "AorB!2024";
function xor(str) {
	return str.split("").map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ KEY.charCodeAt(i % 9))).join("");
}
function decode(slug) {
	try {
		const base64 = slug.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
		const json = xor(atob(padded));
		return JSON.parse(json);
	} catch {
		return null;
	}
}
//#endregion
//#region components/ChallengeCard.vue
var _sfc_main$1 = {
	__name: "ChallengeCard",
	__ssrInlineRender: true,
	props: {
		side: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		status: {
			type: String,
			default: "hidden",
			validator: (v) => [
				"hidden",
				"locked",
				"chosen",
				"chosen-answered",
				"peek"
			].includes(v)
		},
		waNumber: {
			type: String,
			default: ""
		}
	},
	emits: ["choose", "sendWp"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "perspective w-full max-w-sm" }, _attrs))} data-v-004114b8><div class="${ssrRenderClass([__props.status === "locked" ? "cursor-not-allowed" : "cursor-pointer", "relative h-72 cursor-pointer select-none"])}" data-v-004114b8><div class="${ssrRenderClass([[__props.status === "hidden" || __props.status === "locked" ? "opacity-100 rotate-y-0" : "opacity-0 -rotate-y-180 pointer-events-none", __props.status === "locked" ? "opacity-60 hover:translate-y-0 hover:shadow-lg" : ""], "absolute inset-0 rounded-3xl border-2 border-stone-200 bg-white shadow-lg transition-all duration-500 backface-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-xl"])}" data-v-004114b8><span class="text-8xl font-black text-stone-200" data-v-004114b8>${ssrInterpolate(__props.side)}</span>`);
			if (__props.status === "locked") _push(`<div class="absolute inset-0 bg-white/60 rounded-3xl flex items-center justify-center" data-v-004114b8><span class="rounded-full bg-stone-800/10 px-4 py-2 text-sm font-medium text-stone-400" data-v-004114b8> Pick the other option first </span></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="${ssrRenderClass([[__props.status === "hidden" || __props.status === "locked" ? "opacity-0 rotate-y-180 pointer-events-none" : "opacity-100 rotate-y-0", __props.status === "peek" ? "border-stone-200" : "border-rose-300 shadow-rose-100"], "absolute inset-0 rounded-3xl border-2 bg-white shadow-lg transition-all duration-500 backface-hidden flex flex-col p-6"])}" data-v-004114b8><div class="flex-1 flex flex-col items-center justify-center text-center" data-v-004114b8><span class="${ssrRenderClass([__props.status === "peek" ? "text-stone-300" : "text-rose-500", "text-xs font-bold uppercase tracking-widest mb-2"])}" data-v-004114b8> Option ${ssrInterpolate(__props.side)}</span><p class="text-lg font-medium text-stone-800 leading-relaxed" data-v-004114b8>${ssrInterpolate(__props.label)}</p></div>`);
			if (__props.status === "chosen") _push(`<button class="mt-auto w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-[0.97]" data-v-004114b8> Send via WhatsApp </button>`);
			else if (__props.status === "chosen-answered") _push(`<div class="mt-auto w-full rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-500 text-center" data-v-004114b8> ✓ Picked via WhatsApp </div>`);
			else _push(`<!---->`);
			_push(`</div></div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChallengeCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ChallengeCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-004114b8"]]);
//#endregion
//#region pages/r/[slug].vue
var _sfc_main = {
	__name: "[slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const data = ref(null);
		const error = ref(false);
		const chosen = ref(null);
		const answered = ref(false);
		const slug = route.params.slug;
		const capturing = ref(false);
		const captureCardEl = ref(null);
		if (slug) try {
			const decoded = decode(slug);
			if (decoded && decoded.a && decoded.b && decoded.w) data.value = decoded;
			else error.value = true;
		} catch {
			error.value = true;
		}
		else error.value = true;
		useHead$1({
			title: () => data.value?.q || "What's your pick?",
			meta: [
				{
					property: "og:title",
					content: () => data.value?.q || "What's your pick?"
				},
				{
					property: "og:description",
					content: "See what options you have and make a pick"
				},
				{
					name: "description",
					content: "See what options you have and make a pick"
				}
			]
		});
		const storageKey = `pickt_${slug}`;
		const pendingKey = `pickt_pending_${slug}`;
		const showCheatModal = ref(false);
		function beforeUnloadHandler(e) {
			e.preventDefault();
			e.returnValue = "";
		}
		const cardStatus = (side) => {
			if (!data.value) return "hidden";
			if (chosen.value === side && answered.value) return "chosen-answered";
			if (chosen.value === side) return "chosen";
			if (chosen.value && answered.value) return "peek";
			if (chosen.value && chosen.value !== side) return "locked";
			return "hidden";
		};
		function onChoose(side) {
			if (chosen.value) return;
			chosen.value = side;
			sessionStorage.setItem(pendingKey, side);
			(void 0).addEventListener("beforeunload", beforeUnloadHandler);
		}
		async function onSendWp(side) {
			if (!data.value) return;
			capturing.value = true;
			await nextTick();
			const number = data.value.w.replace(/[^0-9]/g, "");
			const text = encodeURIComponent(`I pick ${side}: ${data.value[side.toLowerCase()]}`);
			try {
				if (captureCardEl.value) {
					const canvas = await html2canvas(captureCardEl.value, {
						scale: 2,
						backgroundColor: "#ffffff",
						width: 400,
						height: 520
					});
					const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
					const file = new File([blob], "pickt-card.png", { type: "image/png" });
					if ((void 0).canShare?.({ files: [file] })) await (void 0).share({
						files: [file],
						title: "My pick",
						text: `I picked ${side}!`
					});
					else (void 0).open(URL.createObjectURL(blob), "_blank");
				}
			} catch {}
			(void 0).open(`https://wa.me/${number}?text=${text}`, "_blank");
			confetti({
				particleCount: 120,
				spread: 80,
				origin: { y: .6 },
				colors: [
					"#F43F5E",
					"#F59E0B",
					"#10B981",
					"#3B82F6",
					"#8B5CF6"
				]
			});
			answered.value = true;
			capturing.value = false;
			localStorage.setItem(storageKey, side);
			sessionStorage.removeItem(pendingKey);
			(void 0).removeEventListener("beforeunload", beforeUnloadHandler);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ChallengeCard = ChallengeCard_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-center px-6 py-12" }, _attrs))}>`);
			if (unref(error)) {
				_push(`<div class="mt-20 text-center"><div class="mb-4 text-5xl">😕</div><h2 class="mb-2 text-2xl font-black text-stone-900">This pick doesn&#39;t exist</h2><p class="mb-8 text-stone-400">The link might be wrong or expired.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/",
					class: "inline-block rounded-2xl bg-stone-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-stone-900"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Create your own pick `);
						else return [createTextVNode(" Create your own pick ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else if (unref(data)) {
				_push(`<!--[--><h1 class="mb-2 text-center text-3xl font-black text-stone-900">${ssrInterpolate(unref(data).q || "What's your pick?")}</h1>`);
				if (!unref(chosen)) _push(`<p class="mb-10 text-stone-400">Tap a card to reveal the options</p>`);
				else if (unref(chosen) && !unref(answered)) _push(`<p class="mb-10 text-stone-400"> Send your pick via WhatsApp to see what you missed </p>`);
				else _push(`<p class="mb-10 text-stone-400"> You picked <strong class="text-stone-700">${ssrInterpolate(unref(chosen))}</strong>. Now see the other option! </p>`);
				_push(`<div class="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch">`);
				_push(ssrRenderComponent(_component_ChallengeCard, {
					side: "A",
					label: unref(data).a,
					status: cardStatus("A"),
					"wa-number": unref(data).w,
					onChoose,
					onSendWp
				}, null, _parent));
				_push(ssrRenderComponent(_component_ChallengeCard, {
					side: "B",
					label: unref(data).b,
					status: cardStatus("B"),
					"wa-number": unref(data).w,
					onChoose,
					onSendWp
				}, null, _parent));
				_push(`</div>`);
				if (unref(chosen) && !unref(answered)) _push(`<p class="mt-10 text-center text-xs text-stone-300"> Don&#39;t worry — the other option stays hidden until you send. </p>`);
				else _push(`<!---->`);
				_push(`<!--]-->`);
			} else _push(`<div class="mt-20"><div class="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div></div>`);
			_push(`<div class="fixed left-[-9999px] top-0 w-[400px] overflow-hidden rounded-3xl border border-stone-100 bg-white" style="${ssrRenderStyle({ "height": "520px" })}"><div class="flex h-full flex-col"><div class="${ssrRenderClass([unref(chosen) === "A" ? "bg-amber-400" : "bg-violet-500", "h-1.5 w-full shrink-0"])}"></div><div class="flex flex-col items-center justify-center px-10 pt-10 pb-6 text-center"><div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-50 text-3xl leading-none"> ❓ </div><p class="text-2xl font-black text-stone-900 leading-[1.2]">${ssrInterpolate(unref(data)?.q || "What's your pick?")}</p></div><div class="mx-10 border-t border-stone-100"></div><div class="flex flex-1 flex-col items-center justify-center px-10 text-center"><span class="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-stone-400">I PICKED</span><div class="${ssrRenderClass([unref(chosen) === "A" ? "bg-amber-50" : "bg-violet-50", "inline-flex items-center gap-4 rounded-2xl px-6 py-4"])}"><span class="${ssrRenderClass([unref(chosen) === "A" ? "bg-amber-400" : "bg-violet-500", "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white leading-none"])}">${ssrInterpolate(unref(chosen))}</span><span class="text-xl font-bold text-stone-800 leading-snug">${ssrInterpolate(unref(chosen) === "A" ? unref(data)?.a : unref(data)?.b)}</span></div></div><div class="flex items-center justify-center gap-2 border-t border-stone-100 px-10 py-6"><svg width="48" height="16" viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 opacity-30"><rect x="0" y="4" width="44" height="56" rx="11" fill="#F59E0B"></rect><rect x="24" y="4" width="44" height="56" rx="11" fill="#7C3AED"></rect><text x="20.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">A</text><text x="44.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">B</text><text x="82" y="44" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#1C1917" letter-spacing="-1">pickt</text></svg><span class="text-xs font-medium text-stone-300">pickt</span></div></div></div>`);
			if (unref(capturing)) _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80"><div class="text-center"><div class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div><p class="text-sm font-medium text-stone-500">Generating your card...</p></div></div>`);
			else _push(`<!---->`);
			if (unref(showCheatModal)) _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"><div class="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"><div class="mb-3 text-5xl">👀</div><h2 class="mb-2 text-2xl font-black text-stone-900">Nice try, cheater.</h2><p class="mb-1 text-stone-500"> You already peeked at <strong class="text-stone-700">Option ${ssrInterpolate(unref(chosen))}</strong>. </p><p class="mb-6 text-stone-500"> No reloading your way out of this one. Send it or admit defeat. </p><button class="rounded-2xl bg-stone-800 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-stone-900"> I&#39;ll send it, relax </button></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/r/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-X5Yd8fO_.mjs.map
