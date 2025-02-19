pkgname=notion-calendar-widget
pkgver=1.0.0
pkgrel=1
pkgdesc="A widget window that displays notion calendar as a compact sidebar, that also responds to PYWAL themes."
arch=('any')
url="https://github.com/meeplabsdev/notion-calendar-widget"
licence=('MIT')
depends=()
makedepends=('npm' 'nodejs')
source=("$pkgname-$pkgver::git+$url.git#tag=$pkgver")
md5sums=('SKIP')

build() {
	cd "$pkgname-$pkgver"
	npm install
	npm run package
}

package() {
	cd "$pkgname-$pkgver"
	install -Dm755 "$pkgdir/usr/lib/$pkgname"
	cp -r out/notion-calendar-widget-*/* "$pkgdir/usr/lib/$pkgname"
	install -Dm755 "$pkgdir/usr/lib/$pkgname/notion-calendar-widget" "$pkgdir/usr/bin/notion-calendar-widget"
    	install -Dm644 LICENSE "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}
