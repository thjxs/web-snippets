const IS_FF = typeof InstallTrigger !== 'undefined';
const IS_IE = false || !!document.documentMode;
const IS_SAFARI =
  Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
const IS_CHROME = !!window.chrome;

console.log(IS_CHROME, IS_SAFARI, IS_IE, IS_FF);
