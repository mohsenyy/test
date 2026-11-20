# pouyaSys PWA

## انتشار نسخه جدید
1. تغییرات را انجام دهید.
2. `./bump.sh 1.1.0` (نسخه را در `sw.js` و `version.json` عوض می‌کند)
3. `CHANGELOG.md` را به‌روز کنید.
4. `git add . && git commit -m "v1.1.0" && git push`

کاربران با باز کردن اپ (یا هر ساعت) نسخه جدید را می‌گیرند و پیام «به‌روزرسانی» می‌بینند.

## اجرای محلی
`python3 -m http.server 8080` و باز کردن http://localhost:8080
