# ORVANYX WEBSITE - BEGINNER'S GUIDE
Complete instructions for managing your website

## 📁 FILE STRUCTURE
```
orvanyx.com/
├── index.html          # Home page with health blogs
├── styles.css          # Styles for home page
├── bio.html            # Bio directory (shows all users)
├── bio-styles.css      # Styles for all bio pages
├── bio-orvanyx.html    # Orvanyx's bio page
├── bio-zero.html       # Zero's bio page
└── README.txt          # This file
```

═══════════════════════════════════════════════════════════
## 🏠 EDITING THE HOME PAGE (index.html)
═══════════════════════════════════════════════════════════

### Change the Site Title
1. Open `index.html`
2. Find line 24: `<h1 class="site-title">Orvanyx</h1>`
3. Change "Orvanyx" to your desired title

### Change the Subtitle
1. Find line 25: `<p class="site-subtitle">Orvan's World & Vision</p>`
2. Change the text between the tags

### Edit Blog Posts
Each blog post has this structure:
```html
<article class="blog-card" style="animation-delay: 0.1s">
    <div class="blog-image" style="background: GRADIENT-HERE;"></div>
    <div class="blog-content">
        <span class="blog-date">DATE-HERE</span>
        <h3 class="blog-title">TITLE-HERE</h3>
        <p class="blog-excerpt">EXCERPT-HERE</p>
        <a href="#" class="read-more">Read Article →</a>
    </div>
</article>
```

**To edit a blog post:**
1. Find the article you want to change (they're numbered in comments)
2. Change the gradient colors in `style="background: linear-gradient(...)"`
3. Update the date
4. Update the title
5. Update the excerpt text

**To add a new blog post:**
1. Copy an entire `<article>...</article>` block
2. Paste it before the closing `</div>` of the blog-grid
3. Increase the animation-delay (e.g., 0.7s, 0.8s, etc.)
4. Change all the content as described above

**To delete a blog post:**
- Delete the entire `<article>...</article>` block

═══════════════════════════════════════════════════════════
## 👥 MANAGING BIO USERS
═══════════════════════════════════════════════════════════

### The Bio System Has 3 Parts:
1. **bio.html** - Directory page showing all users
2. **bio-USERNAME.html** - Individual user pages
3. **bio-styles.css** - Shared styles for all bio pages

═══════════════════════════════════════════════════════════
## 📋 ADDING A NEW USER (3 STEPS)
═══════════════════════════════════════════════════════════

### STEP 1: Add User Card to Directory (bio.html)

1. Open `bio.html`
2. Find the section marked "TO ADD A NEW USER CARD"
3. Copy this template:

```html
<a href="bio-NEWNAME.html" class="user-card" style="animation-delay: 0.3s">
    <div class="card-background" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);"></div>
    <div class="card-content">
        <div class="user-avatar" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
            <!-- Add image: <img src="avatar.jpg" alt="Avatar"> -->
            N
        </div>
        <h2 class="user-name">New User</h2>
        <p class="user-handle">@newuser</p>
    </div>
</a>
```

4. Edit the template:
   - `href="bio-NEWNAME.html"` → Your new page filename
   - `animation-delay: 0.3s` → Increase by 0.1s for each user
   - Card background gradient colors
   - Avatar background color and letter/image
   - User name and handle

### STEP 2: Create User Page

1. Copy either `bio-orvanyx.html` or `bio-zero.html`
2. Rename it to `bio-NEWNAME.html`
3. Open the file and edit:

**Background:**
- Line 16: Change gradient colors in the style attribute

**Profile Picture:**
- Line 31: Change avatar background color
- Line 32: Uncomment and add image, OR keep the letter

**Profile Info:**
- Line 37: Change the name
- Line 43: Change the bio description

**Links:**
- Edit each link's href, icon, and text
- Copy/paste link blocks to add more
- Delete link blocks you don't need

**Music Player (Optional):**
- Uncomment lines 106-113
- Replace "your-music.mp3" with your audio file

### STEP 3: Upload and Test

1. Save all files
2. Upload to your website
3. Visit orvanyx.com/bio.html
4. Click on your new user card
5. Test all links

═══════════════════════════════════════════════════════════
## 🗑️ DELETING A USER
═══════════════════════════════════════════════════════════

1. Open `bio.html`
2. Find the user card you want to remove
3. Delete the entire `<a href="bio-..." class="user-card">...</a>` block
4. Delete the corresponding `bio-USERNAME.html` file from your server
5. Done!

═══════════════════════════════════════════════════════════
## 🎨 CUSTOMIZING COLORS
═══════════════════════════════════════════════════════════

### Home Page Colors (styles.css)
Open `styles.css` and find these variables at the top:

```css
:root {
    --color-bg: #fafaf9;        /* Page background */
    --color-text: #1c1917;       /* Text color */
    --color-accent: #0f172a;     /* Accent color */
    --color-secondary: #64748b;  /* Secondary text */
}
```

Change these hex codes to your preferred colors.

### Bio Page Gradients
In each bio page file, find the background style:
```html
<div class="user-bio-page" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
```

**Popular Gradient Examples:**
- Purple: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Ocean: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Sunset: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`
- Forest: `linear-gradient(135deg, #134e5e 0%, #71b280 100%)`
- Dark: `linear-gradient(135deg, #0f0f0f 0%, #434343 100%)`

Find more gradients at: https://uigradients.com

═══════════════════════════════════════════════════════════
## 🖼️ ADDING IMAGES
═══════════════════════════════════════════════════════════

### Profile Pictures

1. Upload your image to the same folder as your HTML files
2. Open the bio page file
3. Find the avatar section
4. Uncomment the image line and add your filename:

```html
<div class="bio-avatar" style="background: ...">
    <img src="my-photo.jpg" alt="Profile Picture">
    <!-- Remove or comment out the letter below -->
</div>
```

### Blog Post Images (Advanced)

Replace the gradient background with an image:

**Before:**
```html
<div class="blog-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
```

**After:**
```html
<div class="blog-image" style="background: url('blog-image.jpg') center/cover;"></div>
```

═══════════════════════════════════════════════════════════
## 🎵 ADDING BACKGROUND MUSIC
═══════════════════════════════════════════════════════════

1. Upload your .mp3 file to your website folder
2. Open the bio page file
3. Find the "MUSIC PLAYER" section (usually around line 106)
4. Uncomment the section by removing `<!--` and `-->`
5. Replace "your-music.mp3" with your filename
6. Save and test

**Note:** Music will only play when the user clicks the play button (browsers require user interaction for autoplay)

═══════════════════════════════════════════════════════════
## 🔗 CHANGING LINK ICONS
═══════════════════════════════════════════════════════════

Each link has an emoji icon. Here are some popular options:

- 📸 Instagram
- 🎥 YouTube
- 🐦 Twitter/X
- 💼 LinkedIn
- 💻 GitHub
- 🎨 Portfolio/Art
- 🎵 Music/Spotify
- 📧 Email
- 🌐 Website
- 📱 TikTok
- 💬 Discord
- 🎮 Twitch
- 📝 Blog
- 🛒 Shop

Just copy the emoji and paste it between the `<span class="link-icon">` tags.

═══════════════════════════════════════════════════════════
## 📱 TESTING YOUR WEBSITE
═══════════════════════════════════════════════════════════

### Test Locally (Before Uploading)
1. Open the HTML file in your web browser
2. Check all pages load correctly
3. Click all links to make sure they work
4. Test on mobile by resizing your browser window

### Test Live (After Uploading)
1. Visit orvanyx.com
2. Visit orvanyx.com/bio.html
3. Click through all user pages
4. Test on your phone

═══════════════════════════════════════════════════════════
## 🆘 TROUBLESHOOTING
═══════════════════════════════════════════════════════════

### Bio page looks broken
- Make sure `bio-styles.css` is in the same folder
- Check that the CSS file link in the HTML is correct

### Colors don't match
- Each bio page has its own background gradient
- Edit the style attribute in each file individually

### Links don't work
- Check that href="..." has the correct URL
- URLs should start with https:// or mailto:

### Images don't show
- Make sure image files are in the same folder
- Check filename matches exactly (case-sensitive)
- Supported formats: .jpg, .jpeg, .png, .gif, .webp

### Animation delays look wrong
- Each element should increase by 0.1s
- First element: 0.1s, Second: 0.2s, Third: 0.3s, etc.

═══════════════════════════════════════════════════════════
## 📤 UPLOADING TO YOUR SERVER
═══════════════════════════════════════════════════════════

1. Connect to your web hosting via FTP (FileZilla, Cyberduck, etc.)
2. Upload all files to your public_html or www folder
3. Make sure file permissions are set to 644 for HTML/CSS files
4. Test by visiting orvanyx.com in your browser

═══════════════════════════════════════════════════════════
## ✅ QUICK REFERENCE CHECKLIST
═══════════════════════════════════════════════════════════

**For each new user:**
□ Add user card to bio.html
□ Create bio-USERNAME.html page
□ Edit background gradient
□ Add profile picture (or letter)
□ Edit name and bio
□ Add/edit links
□ Optional: Add music player
□ Test the page

**Regular updates:**
□ Keep blog posts current on home page
□ Update bio links as needed
□ Change profile pictures when desired
□ Adjust colors/gradients for freshness

═══════════════════════════════════════════════════════════
## 💡 TIPS FOR BEGINNERS
═══════════════════════════════════════════════════════════

1. **Always make backups** before editing files
2. **Test locally first** before uploading to your server
3. **Use a code editor** like VS Code, Sublime Text, or Notepad++
4. **Be patient** - web development takes practice
5. **One change at a time** - easier to find what broke
6. **Save often** while editing
7. **Check on mobile** - lots of people browse on phones
8. **Read the comments** in the HTML files - they guide you

═══════════════════════════════════════════════════════════

Good luck with your website! 🚀

If you need help, look for the HTML comments (<!-- like this -->)
in the code - they explain what each section does.