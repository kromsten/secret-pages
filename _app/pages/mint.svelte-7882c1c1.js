import{S as I,i as T,s as V,j as A,m as C,o as B,x as S,u as w,v as O,e as h,k as R,c as g,a as v,n as Y,d as u,b as y,f as m,F as b,w as $,M as q,t as k,g as M,r as H,O as J,h as U,N as D}from"../chunks/vendor-86cad2fa.js";import{w as z}from"../chunks/stores-f80519e3.js";import{S as f}from"../chunks/types-8cbee3bc.js";function F(l){let t,e;return t=new q({props:{color:"primary",variant:"raised",class:l[0]!=f.Minting?"":"disabled",ripple:l[0]!=f.Minting,$$slots:{default:[G]},$$scope:{ctx:l}}}),t.$on("click",l[3]),{c(){A(t.$$.fragment)},l(s){C(t.$$.fragment,s)},m(s,r){B(t,s,r),e=!0},p(s,r){const a={};r&1&&(a.class=s[0]!=f.Minting?"":"disabled"),r&1&&(a.ripple=s[0]!=f.Minting),r&16&&(a.$$scope={dirty:r,ctx:s}),t.$set(a)},i(s){e||(S(t.$$.fragment,s),e=!0)},o(s){w(t.$$.fragment,s),e=!1},d(s){O(t,s)}}}function G(l){let t;return{c(){t=k("Mint")},l(e){t=M(e,"Mint")},m(e,s){m(e,t,s)},d(e){e&&u(t)}}}function K(l){let t;return{c(){t=k(l[1])},l(e){t=M(e,l[1])},m(e,s){m(e,t,s)},p(e,s){s&2&&U(t,e[1])},d(e){e&&u(t)}}}function L(l){let t,e,s,r,a;return{c(){t=h("h6"),e=k("You got an NFT!"),s=k(`
                    See it in your `),r=h("a"),a=k("collection"),this.h()},l(o){t=g(o,"H6",{class:!0});var n=v(t);e=M(n,"You got an NFT!"),n.forEach(u),s=M(o,`
                    See it in your `),r=g(o,"A",{href:!0});var _=v(r);a=M(_,"collection"),_.forEach(u),this.h()},h(){y(t,"class","mdc-typography--headline6"),y(r,"href","/collection")},m(o,n){m(o,t,n),b(t,e),m(o,s,n),m(o,r,n),b(r,a)},p:D,d(o){o&&u(t),o&&u(s),o&&u(r)}}}function P(l){let t;return{c(){t=k("Minting...")},l(e){t=M(e,"Minting...")},m(e,s){m(e,t,s)},p:D,d(e){e&&u(t)}}}function Q(l){let t,e,s,r,a,o,n=l[0]!==f.Minted&&F(l);function _(i,d){if(i[0]==f.Minting)return P;if(i[0]==f.Minted)return L;if(i[0]==f.Error)return K}let p=_(l),c=p&&p(l);return{c(){t=h("div"),e=h("div"),n&&n.c(),s=R(),r=h("div"),a=h("div"),c&&c.c(),this.h()},l(i){t=g(i,"DIV",{class:!0});var d=v(t);e=g(d,"DIV",{class:!0});var E=v(e);n&&n.l(E),s=Y(E),r=g(E,"DIV",{class:!0});var N=v(r);a=g(N,"DIV",{class:!0});var j=v(a);c&&c.l(j),j.forEach(u),N.forEach(u),E.forEach(u),d.forEach(u),this.h()},h(){y(a,"class","center svelte-yocf23"),y(r,"class","center mdc-typography--body1 svelte-yocf23"),y(e,"class","center svelte-yocf23"),y(t,"class","wrapper center svelte-yocf23")},m(i,d){m(i,t,d),b(t,e),n&&n.m(e,null),b(e,s),b(e,r),b(r,a),c&&c.m(a,null),o=!0},p(i,[d]){i[0]!==f.Minted?n?(n.p(i,d),d&1&&S(n,1)):(n=F(i),n.c(),S(n,1),n.m(e,s)):n&&(H(),w(n,1,1,()=>{n=null}),$()),p===(p=_(i))&&c?c.p(i,d):(c&&c.d(1),c=p&&p(i),c&&(c.c(),c.m(a,null)))},i(i){o||(S(n),o=!0)},o(i){w(n),o=!1},d(i){i&&u(t),n&&n.d(),c&&c.d()}}}function W(l,t,e){let s=f.Ready,r="",a;return[s,r,a,()=>{s!=f.Minting&&(e(0,s=f.Minting),z.mint().then(n=>{e(2,a=n);const _=J.exports.Buffer.from(a.data).toString();return JSON.parse(_)}).then(n=>{var _;((_=n==null?void 0:n.send)==null?void 0:_.status)=="success"?e(0,s=f.Minted):(e(0,s=f.Error),e(1,r="Unknown error. Try again."))}).catch(n=>{e(0,s=f.Error),n.message.includes("fees")?e(1,r="Fees you set are unsufficent"):n.message.includes("balance")?e(1,r="Not enough funds in the wallet. Make sure you have at least 150 sSCRT"):n.message.includes("All tokens")?e(1,r="All tokens have been minted"):e(1,r=n.message)}))}]}class ee extends I{constructor(t){super();T(this,t,W,Q,V,{})}}export{ee as default};
