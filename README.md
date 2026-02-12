 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index d5506c454d271ec9b0568bcf84cddd78e2ad626e..4c4337bee9fa12ab620a710a3804b69d0cae767a 100644
--- a/README.md
+++ b/README.md
@@ -1,16 +1,24 @@
-## Hi there 👋
+# Orvanyx Website (Netlify Ready)
 
-<!--
-**orvanyx/orvanyx** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.
+Modern static website for **orvanyx.com** with two pages:
 
-Here are some ideas to get you started:
+- `index.html` → brand landing page with introduction **"orvans world and vision"**
+- `private-links.html` → private link vault for `@orvanyx` with:
+  - moving next-gen canvas background
+  - background music toggle
+  - random profile picture
+  - local private passcode lock
+  - editable links stored in browser localStorage
 
-- 🔭 I’m currently working on ...
-- 🌱 I’m currently learning ...
-- 👯 I’m looking to collaborate on ...
-- 🤔 I’m looking for help with ...
-- 💬 Ask me about ...
-- 📫 How to reach me: ...
-- 😄 Pronouns: ...
-- ⚡ Fun fact: ...
--->
+## Deploy to Netlify
+1. Push this repository to GitHub.
+2. Open Netlify → **Add new site** → **Import an existing project**.
+3. Select this repo.
+4. Build command: *(none required)*
+5. Publish directory: `.`
+6. Deploy site.
+
+## Connect Porkbun domain
+1. In Netlify: **Site settings** → **Domain management** → **Add domain** → `orvanyx.com`.
+2. In Porkbun DNS, point your domain records to Netlify using values shown in Netlify's domain setup.
+3. Wait for DNS propagation and enable HTTPS in Netlify.
 
EOF
)
