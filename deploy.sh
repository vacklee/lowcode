cd dist
git init
git add -A
git commit -m "auto construct blog"

git push -f git@github.com:vacklee/lowcode.git master:gh-pages
