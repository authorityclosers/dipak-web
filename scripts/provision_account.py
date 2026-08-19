import subprocess, uuid, datetime

# Argon2 Hash for password 'AuthorityClosers2026!'
# Generated directly from naya-api container
ARGON2_HASH = "$argon2id$v=19$m=65536,t=3,p=4$bHINs4137Pe/Yy5ukgubYQ$lQDi2pqzUl1Ua1pJjfpkNSKTmi/uheDazp0Kw+PbIrE"

def run_remote_sql(sql):
    cmd = ['ssh', 'nivi', 'docker exec -i naya-postgres psql -U naya -d naya_growth']
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    out, err = p.communicate(input=sql)
    return out, err

if __name__ == '__main__':
    user_id = 'usr_authclosers_admin_01'
    account_id = 'ws_authclosers_01'
    project_id = 'proj_dipak_web_01'
    site_id = 'site_dipak_web_01'
    connector_id = 'conn_dipak_web_form_01'
    public_lead_key = 'plk_authorityclosers_01'
    public_connector_key = 'src_authorityclosers_web'
    
    setup_sql = f'''
    BEGIN;
    
    -- 1. Create PortalUser admin@authorityclosers.com
    INSERT INTO "PortalUser" (id, email, "fullName", "companyName", status, role, "emailVerifiedAt", "createdAt", "updatedAt")
    VALUES ('{user_id}', 'admin@authorityclosers.com', 'Authority Closers Admin', 'Authority Closers', 'ACTIVE', 'CLIENT', NOW(), NOW(), NOW())
    ON CONFLICT (email) DO UPDATE SET status='ACTIVE', role='CLIENT', "fullName"='Authority Closers Admin', "updatedAt"=NOW()
    RETURNING id, email, "fullName", role, status;

    -- 2. Create AuthCredential (Password)
    INSERT INTO "AuthCredential" ("portalUserId", kind, "passwordHash", "createdAt", "updatedAt")
    VALUES ('{user_id}', 'PASSWORD', '{ARGON2_HASH}', NOW(), NOW())
    ON CONFLICT ("portalUserId") DO UPDATE SET kind='PASSWORD', "passwordHash"='{ARGON2_HASH}', "updatedAt"=NOW();

    -- 3. Create WorkspaceAccount
    INSERT INTO "WorkspaceAccount" (id, name, "legalName", industry, "websiteUrl", "createdAt", "updatedAt")
    VALUES ('{account_id}', 'Authority Closers', 'Authority Closers Private Limited', 'Sales Enablement & Advisory', 'https://authorityclosers.com', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name='Authority Closers', "updatedAt"=NOW();

    -- 4. Create WorkspaceAccountMember
    INSERT INTO "WorkspaceAccountMember" (id, "accountId", "portalUserId", role, status, "createdAt", "updatedAt")
    VALUES ('mem_authclosers_admin_01', '{account_id}', '{user_id}', 'ACCOUNT_OWNER', 'ACTIVE', NOW(), NOW())
    ON CONFLICT ("accountId", "portalUserId") DO UPDATE SET role='ACCOUNT_OWNER', status='ACTIVE', "updatedAt"=NOW();

    -- 5. Create Project for Dipak Vishwakarma / Authority Closers
    INSERT INTO "Project" (id, name, slug, "publicLeadKey", "primaryDomain", "accountId", status, "createdAt", "updatedAt")
    VALUES ('{project_id}', 'Dipak Vishwakarma Public Web', 'dipak-vishwakarma', '{public_lead_key}', 'dipakvishwakarma.com', '{account_id}', 'ACTIVE', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET name='Dipak Vishwakarma Public Web', slug='dipak-vishwakarma', "publicLeadKey"='{public_lead_key}', "primaryDomain"='dipakvishwakarma.com', "updatedAt"=NOW();

    -- 6. Create ProjectMembership
    INSERT INTO "ProjectMembership" (id, "projectId", "portalUserId", role, status, "createdAt", "updatedAt")
    VALUES ('pmem_authclosers_admin_01', '{project_id}', '{user_id}', 'OWNER', 'ACTIVE', NOW(), NOW())
    ON CONFLICT ("projectId", "portalUserId") DO UPDATE SET role='OWNER', status='ACTIVE', "updatedAt"=NOW();

    -- 7. Create ProjectSite for dipakvishwakarma.com
    INSERT INTO "ProjectSite" (id, "projectId", slug, "templateKey", "previewHost", "publishStatus", "contentConfig", "createdAt", "updatedAt")
    VALUES ('{site_id}', '{project_id}', 'dipak-vishwakarma', 'custom-nextjs-v1', 'dipakvishwakarma.com', 'PUBLISHED', '{{}}'::jsonb, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET "previewHost"='dipakvishwakarma.com', "publishStatus"='PUBLISHED', "updatedAt"=NOW();

    -- 8. Create LeadSourceConnector (WEB_FORM) with tracking script public key
    INSERT INTO "LeadSourceConnector" (id, "projectId", kind, status, label, "publicKey", config, metadata, "createdAt", "updatedAt")
    VALUES (
        '{connector_id}',
        '{project_id}',
        'WEB_FORM',
        'ACTIVE',
        'Dipak Vishwakarma Web Form & GTag Tracker',
        '{public_connector_key}',
        '{{"setupState": "ACTIVE", "featureFlag": "webhook_ready", "securityMode": "BROWSER", "ownedWebsite": true}}'::jsonb,
        '{{"verificationStatus": "VERIFIED", "sourceSetupVersion": "naya-intake-os-v0.5"}}'::jsonb,
        NOW(),
        NOW()
    )
    ON CONFLICT ("publicKey") DO UPDATE SET
        status='ACTIVE',
        label='Dipak Vishwakarma Web Form & GTag Tracker',
        config='{{"setupState": "ACTIVE", "featureFlag": "webhook_ready", "securityMode": "BROWSER", "ownedWebsite": true}}'::jsonb,
        "updatedAt"=NOW()
    RETURNING id, "projectId", kind, status, label, "publicKey";

    COMMIT;
    '''
    
    out, err = run_remote_sql(setup_sql)
    print("PROVISIONING OUTPUT:\n", out)
    if err:
        print("PROVISIONING ERROR:\n", err)
