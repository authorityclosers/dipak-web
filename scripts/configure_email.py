import subprocess

def run_remote_sql(sql):
    cmd = ['ssh', 'nivi', 'docker exec -i naya-postgres psql -U naya -d naya_growth']
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    out, err = p.communicate(input=sql)
    return out, err

if __name__ == '__main__':
    account_id = 'ws_authclosers_01'
    project_id = 'proj_dipak_web_01'
    user_id = 'usr_authclosers_admin_01'
    email = 'admin@authorityclosers.com'
    
    setup_email_sql = f'''
    BEGIN;

    -- 1. ProjectNotificationRecipient
    INSERT INTO "ProjectNotificationRecipient" (id, "projectId", email, label, "createdAt", "updatedAt")
    VALUES ('pnr_authclosers_admin_01', '{project_id}', '{email}', 'Authority Closers Lead Admin', NOW(), NOW())
    ON CONFLICT ("projectId", email) DO UPDATE SET label='Authority Closers Lead Admin', "updatedAt"=NOW();

    -- 2. ProjectBillingContact
    INSERT INTO "ProjectBillingContact" (id, "projectId", email, label, "isActive", "createdAt", "updatedAt")
    VALUES ('pbc_authclosers_admin_01', '{project_id}', '{email}', 'Authority Closers Billing Admin', true, NOW(), NOW())
    ON CONFLICT ("projectId", email) DO UPDATE SET "isActive"=true, label='Authority Closers Billing Admin', "updatedAt"=NOW();

    -- 3. NotificationSetting (Account level)
    INSERT INTO "NotificationSetting" (
        id, scope, "settingsKey", "accountId", mode, "rolloutScope",
        "enabledCategories", "enabledChannels", "healthChecksEnabled",
        "clientDigestEnabled", "operatorAlertsEnabled", "dryRunEmail",
        "createdAt", "updatedAt"
    )
    VALUES (
        'nset_authclosers_ws_01',
        'ACCOUNT',
        'account:{account_id}',
        '{account_id}',
        'EMAIL_AND_IN_APP',
        'ALL_ACTIVE',
        ARRAY['LEAD_CAPTURE_HEALTH', 'LEAD_DELIVERY_HEALTH', 'DAILY_ACCOUNT_DIGEST', 'FIRST_RESPONSE_READINESS']::"NotificationKind"[],
        ARRAY['EMAIL', 'IN_APP']::"NotificationChannel"[],
        true,
        true,
        true,
        false,
        NOW(),
        NOW()
    )
    ON CONFLICT ("settingsKey") DO UPDATE SET
        mode='EMAIL_AND_IN_APP',
        "rolloutScope"='ALL_ACTIVE',
        "dryRunEmail"=false,
        "healthChecksEnabled"=true,
        "clientDigestEnabled"=true,
        "updatedAt"=NOW();

    -- 4. NotificationSetting (Project level)
    INSERT INTO "NotificationSetting" (
        id, scope, "settingsKey", "projectId", mode, "rolloutScope",
        "enabledCategories", "enabledChannels", "healthChecksEnabled",
        "clientDigestEnabled", "operatorAlertsEnabled", "dryRunEmail",
        "createdAt", "updatedAt"
    )
    VALUES (
        'nset_authclosers_proj_01',
        'PROJECT',
        'project:{project_id}',
        '{project_id}',
        'EMAIL_AND_IN_APP',
        'ALL_ACTIVE',
        ARRAY['LEAD_CAPTURE_HEALTH', 'LEAD_DELIVERY_HEALTH', 'DAILY_ACCOUNT_DIGEST', 'FIRST_RESPONSE_READINESS']::"NotificationKind"[],
        ARRAY['EMAIL', 'IN_APP']::"NotificationChannel"[],
        true,
        true,
        true,
        false,
        NOW(),
        NOW()
    )
    ON CONFLICT ("settingsKey") DO UPDATE SET
        mode='EMAIL_AND_IN_APP',
        "rolloutScope"='ALL_ACTIVE',
        "dryRunEmail"=false,
        "healthChecksEnabled"=true,
        "clientDigestEnabled"=true,
        "updatedAt"=NOW();

    -- 5. NotificationSubscription (for admin@authorityclosers.com)
    INSERT INTO "NotificationSubscription" (
        id, "accountId", "projectId", "userId", email, "normalizedEmail",
        audience, categories, channels, "digestEnabled", "leadAlertsEnabled",
        "criticalAlertsEnabled", "createdFrom", "subscriptionDedupeKey",
        "createdAt", "updatedAt"
    )
    VALUES (
        'nsub_authclosers_admin_01',
        '{account_id}',
        '{project_id}',
        '{user_id}',
        '{email}',
        '{email}',
        'CLIENT',
        ARRAY['LEAD_CAPTURE_HEALTH', 'LEAD_DELIVERY_HEALTH', 'DAILY_ACCOUNT_DIGEST', 'FIRST_RESPONSE_READINESS']::"NotificationKind"[],
        ARRAY['EMAIL', 'IN_APP']::"NotificationChannel"[],
        true,
        true,
        true,
        'PROJECT_NOTIFICATION_RECIPIENT',
        '{account_id}:{project_id}:{email}:CLIENT',
        NOW(),
        NOW()
    )
    ON CONFLICT ("subscriptionDedupeKey") DO UPDATE SET
        "digestEnabled"=true,
        "leadAlertsEnabled"=true,
        "criticalAlertsEnabled"=true,
        channels=ARRAY['EMAIL', 'IN_APP']::"NotificationChannel"[],
        "unsubscribedAt"=NULL,
        "updatedAt"=NOW();

    COMMIT;
    '''
    
    out, err = run_remote_sql(setup_email_sql)
    print("EMAIL CONFIG OUTPUT:\n", out)
    if err:
        print("EMAIL CONFIG ERROR:\n", err)
