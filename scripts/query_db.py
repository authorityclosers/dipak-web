import subprocess

def run_remote_sql(sql):
    cmd = ['ssh', 'nivi', 'docker exec -i naya-postgres psql -U naya -d naya_growth']
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    out, err = p.communicate(input=sql)
    return out, err

if __name__ == '__main__':
    sql = '''
    SELECT id, "projectId", email, label FROM "ProjectNotificationRecipient" WHERE "projectId"='proj_dipak_web_01';
    SELECT id, "subscriptionDedupeKey", "normalizedEmail", channels, "leadAlertsEnabled", "digestEnabled" FROM "NotificationSubscription" WHERE "projectId"='proj_dipak_web_01';
    SELECT id, "settingsKey", mode, "dryRunEmail" FROM "NotificationSetting" WHERE "settingsKey" IN ('account:ws_authclosers_01', 'project:proj_dipak_web_01');
    '''
    out, err = run_remote_sql(sql)
    print("OUTPUT:\n", out)
    if err:
        print("ERROR:\n", err)
