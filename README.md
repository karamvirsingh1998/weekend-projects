# Weekend Projects - Daily Commit Automation

This repository contains an automation script that makes daily commits to maintain GitHub activity.

## 📋 Features

- Makes 1-5 random commits daily
- Automatically logs activity with timestamps
- Configurable git user credentials
- Cron job for daily automation
- Push to remote (if configured)

## 🚀 Quick Start

### 1. Setup

Run the setup script to configure everything:

```bash
cd /Users/karamvirsingh/Downloads/Repos/weekend-projects
chmod +x setup_automation.sh
./setup_automation.sh
```

This will:
- Make the Python script executable
- Initialize git repository (if needed)
- Create activity log file
- Set up daily cron job (runs at 10 AM)

### 2. Configure Remote (Optional)

If you want to push to GitHub:

```bash
git remote add origin https://github.com/yourusername/weekend-projects.git
```

### 3. Test It

Run manually to test:

```bash
python3 daily_commit.py
```

## ⚙️ Configuration

The script uses these git credentials:
- **Name:** karamvirsingh1998
- **Email:** karamvirh71@gmail.com

To change these, edit `daily_commit.py` and update the configuration variables at the top.

## 📅 Schedule

By default, the script runs daily at 10:00 AM. To change the schedule:

```bash
crontab -e
```

Cron format: `minute hour day month weekday command`

Examples:
- `0 10 * * *` - 10:00 AM daily
- `0 22 * * *` - 10:00 PM daily
- `0 */6 * * *` - Every 6 hours
- `0 10 * * 1-5` - 10 AM on weekdays only

## 📊 Monitoring

### View cron jobs
```bash
crontab -l
```

### View execution logs
```bash
tail -f cron.log
```

### View activity log
```bash
cat activity_log.txt
```

## 🗑️ Removal

To stop the automation:

```bash
# Remove cron job
crontab -l | grep -v 'daily_commit.py' | crontab -

# Or edit crontab manually
crontab -e
```

## 📂 Files

- `daily_commit.py` - Main automation script
- `setup_automation.sh` - One-time setup script
- `activity_log.txt` - Commit activity log (auto-generated)
- `cron.log` - Cron execution log (auto-generated)

## 🤖 How It Works

1. Script runs at scheduled time
2. Generates random number (1-5)
3. Makes that many commits to `activity_log.txt`
4. Each commit has a unique timestamp
5. Pushes to remote if configured

## 🔧 Troubleshooting

### Cron job not running?

Check if cron service is running:
```bash
# On macOS
sudo launchctl list | grep cron

# On Linux
sudo systemctl status cron
```

### Commits not showing on GitHub?

1. Ensure remote is configured: `git remote -v`
2. Check if you have push access
3. Review `cron.log` for errors

### Permission issues?

Make sure scripts are executable:
```bash
chmod +x daily_commit.py setup_automation.sh
```

## 📝 Notes

- The script only commits to the local `activity_log.txt` file
- Each commit has a unique timestamp
- Safe to run multiple times per day
- Git credentials are set per-repository (doesn't affect global config)

