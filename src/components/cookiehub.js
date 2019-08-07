const COOKIEHUB_API_KEY = process.env.COOKIEHUB_API_KEY
const GA_API_KEY = process.env.GA_API_KEY

const CookieHub = () =>
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_API_KEY}"></script>
<script type="text/javascript">
var gtagId = '${GA_API_KEY}';
window['ga-disable-' + gtagId] = true;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
</script>
<script src="https://cookiehub.net/cc/${COOKIEHUB_API_KEY}.js"></script>
<script type="text/javascript">
window.addEventListener("load", function() {
window.cookieconsent.initialise({
	onInitialise: function(status) {
		if (this.hasConsented('required')) {
		}
		if (this.hasConsented('analytics')) {
			window['ga-disable-${GA_API_KEY}'] = false;
			gtag('config', gtagId);
		}
	},
	onAllow: function(category) {
		if (category == 'required') {
		}
		if (category == 'analytics') {
			window['ga-disable-${GA_API_KEY}'] = false;
			gtag('config', gtagId);
		}
	},
	onRevoke: function(category) {
		if (category == 'required') {
		}
		if (category == 'analytics') {
			window['ga-disable-${GA_API_KEY}'] = true;
		}
	}
})
});
</script>
`

export default CookieHub
