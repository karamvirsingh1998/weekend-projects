
## ✅ WORKING SOLUTION (Choose ONE)

### Option 1: Simple Cron Job (RECOMMENDED)

Just add this to your crontab:

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 10 AM):
0 10 * * * cd /Users/karamvirsingh/Downloads/Repos/weekend-projects && bash /Users/karamvirsingh/Downloads/Repos/gh-switch.sh karamvir > /dev/null 2>&1 && /usr/bin/python3 /Users/karamvirsingh/Downloads/Repos/weekend-projects/daily_commit.py >> /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log 2>&1
```

**Note:** Your Mac must be awake and not in sleep mode at 10 AM.

---

### Option 2: Run Manually When Needed

Just run this command anytime:

```bash
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
./run_automation.sh
```

---

### Option 3: Background Service (Keep Running)

Start this once and leave it running (it will check every 30 seconds):

```bash
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
./start_daily_automation.sh
```

**To run in background:**
```bash
nohup /Users/karamvirsingh/Downloads/Repos/weekend-projects/start_daily_automation.sh > /dev/null 2>&1 &
```

**To stop:**
```bash
ps aux | grep start_daily_automation.sh
kill <PID>
```

---

## 🧪 Test It Now

To test immediately without waiting:

```bash
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
python3 daily_commit.py
```

---

## 📊 Check Results

```bash
# View automation log
cat /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log

# View activity log  
cat /Users/karamvirsingh/Downloads/Repos/weekend-projects/activity_log.txt

# View recent commits
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
git log --oneline -10

# Check on GitHub
open https://github.com/karamvirsingh1998/weekend-projects
```

---

## 🔧 What It Does

1. Switches to `karamvirsingh1998` GitHub account
2. Makes 1-5 random commits to `activity_log.txt`
3. Pushes to GitHub
4. Logs everything

---

## ⚠️ Troubleshooting

### Cron Not Working?

Your Mac needs to be awake. Try Option 3 (background service) instead.

### Push Failed?

Make sure you're on the correct GitHub account:

```bash
bash /Users/karamvirsingh/Downloads/Repos/gh-switch.sh karamvir
```

### Check Logs

```bash
tail -50 /Users/karamvirsingh/Downloads/Repos/weekend-projects/automation.log
```

