import subprocess

def run_remote_sql(sql):
    cmd = ['ssh', 'nivi', 'docker exec -i naya-postgres psql -U naya -d naya_growth']
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    out, err = p.communicate(input=sql)
    return out, err

if __name__ == '__main__':
    sql = '''
    SELECT id, "projectId", "fullName", email, phone, "sourceKind", "createdAt" FROM "ProjectLead" WHERE id='cmt0am5f106c5mz0196jjm4hc';
    SELECT id, "connectorId", status, "createdAt" FROM "InboundLeadEvent" WHERE id='cmt0am56306bymz01rqs17eoa';
    '''
    out, err = run_remote_sql(sql)
    print("OUTPUT:\n", out)
    if err:
        print("ERROR:\n", err)
