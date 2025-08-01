# 📋 GitHub Templates

This directory contains templates for Pull Requests and Issues that are automatically used by GitHub.

## 🚀 **How to use**

### **Pull Requests**

When you create a new Pull Request, the template will be automatically loaded with:

- ✅ Verification checklist
- ✅ Sections for change description
- ✅ Fields for change type
- ✅ Test instructions
- ✅ Breaking changes fields

### **Issues**

When creating a new Issue, you'll see options for:

- 🐛 **Bug Report** - To report bugs
- ✨ **Feature Request** - To request new features
- 📚 **Documentation Request** - To request documentation improvements

## 📁 **File structure**

```
.github/
├── pull_request_template.md          # PR template
├── ISSUE_TEMPLATE/
│   ├── config.yml                   # Template configuration
│   ├── bug_report.md               # Bug template
│   ├── feature_request.md          # Feature template
│   └── documentation_request.md    # Documentation template
└── README.md                       # This file
```

## 🎯 **Benefits**

### **For the project:**

- ✅ **Standardization** - All PRs and Issues follow the same format
- ✅ **Completeness** - We don't forget important information
- ✅ **Efficiency** - Faster and more organized process
- ✅ **Quality** - Better review and triage

### **For contributors:**

- ✅ **Clarity** - They know exactly what to fill
- ✅ **Ease** - Guided and intuitive process
- ✅ **Consistency** - Same format for everyone

## 🔧 **Customization**

### **Adding new templates:**

1. Create a new `.md` file in `.github/ISSUE_TEMPLATE/`
2. Use YAML format at the top for configuration
3. Add the template to `config.yml`

### **Modifying existing templates:**

- Edit the corresponding `.md` files
- Keep the YAML structure at the top (for issues)
- Test by creating a test PR/Issue

## 📝 **Usage examples**

### **Creating a PR:**

1. Go to the "Pull requests" tab
2. Click "New pull request"
3. The template will be automatically loaded
4. Fill in all relevant sections

### **Reporting a bug:**

1. Go to the "Issues" tab
2. Click "New issue"
3. Select "🐛 Bug Report"
4. Fill in all requested information

### **Requesting a feature:**

1. Go to the "Issues" tab
2. Click "New issue"
3. Select "✨ Feature Request"
4. Describe the desired functionality

## 🚨 **Important**

- ✅ **Always fill** all relevant sections
- ✅ **Be specific** in descriptions
- ✅ **Include screenshots** when applicable
- ✅ **Test before** submitting
- ✅ **Follow project** guidelines

---

**Last updated:** YYYY-MM-DD
**Version:** 1.0.0
