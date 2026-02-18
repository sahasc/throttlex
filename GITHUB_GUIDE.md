# 🚀 How to Push ThrottleX to GitHub

## Prerequisites
- GitHub account (create one at https://github.com if you don't have one)
- Git configured with your username and email

## Step-by-Step Guide

### 1️⃣ Configure Git (First Time Only)

```bash
# Set your GitHub username and email
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Verify configuration
git config --list
```

---

### 2️⃣ Prepare Your Repository

```bash
# Navigate to project directory
cd /app

# Check current status
git status

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: ThrottleX performance community platform"
```

---

### 3️⃣ Create GitHub Repository

**Option A: Via GitHub Website (Recommended)**

1. Go to https://github.com/new
2. Repository name: `throttlex` (or any name you prefer)
3. Description: "Premium performance community platform - rides, packs, marketplace"
4. Choose: **Public** or **Private**
5. ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

**Option B: Via GitHub CLI (if installed)**

```bash
gh repo create throttlex --public --source=. --remote=origin
```

---

### 4️⃣ Connect Local Repository to GitHub

After creating the GitHub repo, you'll see a URL like:
`https://github.com/YOUR_USERNAME/throttlex.git`

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/throttlex.git

# Or if you're using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/throttlex.git

# Verify remote is added
git remote -v
```

---

### 5️⃣ Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If you get an error about 'main' not existing, try:
# git branch -M main
# git push -u origin main
```

**If you encounter authentication issues:**

**For HTTPS (Token Required):**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use token as password when pushing

**For SSH (Recommended):**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add SSH key to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy output and add to GitHub Settings → SSH keys

# Test connection
ssh -T git@github.com
```

---

### 6️⃣ Verify Upload

1. Visit: `https://github.com/YOUR_USERNAME/throttlex`
2. You should see all your files!
3. Check that `.env` files are **NOT** uploaded (only `.env.example` should be there)

---

## 🔄 Future Updates

After making changes:

```bash
# Check what changed
git status

# Add specific files
git add path/to/file

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "Add leaderboard feature"

# Push to GitHub
git push
```

---

## 🔒 Security Checklist

Before pushing, ensure:
- ✅ `.gitignore` includes `.env` files
- ✅ Only `.env.example` files are tracked (not actual `.env`)
- ✅ No API keys in code
- ✅ No sensitive data committed

**To check if .env is tracked:**
```bash
git ls-files | grep .env
# Should only show .env.example files
```

**If .env was accidentally added:**
```bash
# Remove from git (keeps local file)
git rm --cached frontend/.env
git rm --cached backend/.env

# Commit the removal
git commit -m "Remove .env files from tracking"
git push
```

---

## 📦 Clone Your Repository Later

To download your project on another machine:

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/throttlex.git
cd throttlex

# Copy .env.example to .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Edit .env files with your actual keys
nano frontend/.env  # or use any text editor

# Install dependencies
cd frontend
yarn install

# Run the app
yarn start
```

---

## 🌿 Branching Strategy (Optional)

For organized development:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature/new-feature

# On GitHub, create Pull Request to merge to main
```

---

## 🆘 Common Issues

**Issue: "Permission denied (publickey)"**
- Solution: Set up SSH keys (see Step 5 above)

**Issue: "Repository not found"**
- Solution: Check remote URL: `git remote -v`
- Update if needed: `git remote set-url origin https://github.com/YOUR_USERNAME/throttlex.git`

**Issue: "Failed to push refs"**
- Solution: Pull first: `git pull origin main --rebase`
- Then push: `git push origin main`

**Issue: "Large files rejected"**
- Solution: Files over 100MB need Git LFS
- For images: Use external hosting or optimize size

---

## 📱 Quick Reference Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout main
```

---

## 🎯 What's Next?

After pushing to GitHub, you can:
1. ✅ Enable GitHub Pages (for static hosting)
2. ✅ Set up GitHub Actions (for CI/CD)
3. ✅ Add collaborators (Settings → Collaborators)
4. ✅ Create Issues and Projects (for task management)
5. ✅ Connect to Vercel/Netlify for automatic deployments

---

## 🔗 Useful Links

- **GitHub Docs**: https://docs.github.com
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **SSH Setup**: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- **Personal Access Tokens**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

---

**Ready to push! 🚀**

Run the commands above and your ThrottleX project will be on GitHub!
