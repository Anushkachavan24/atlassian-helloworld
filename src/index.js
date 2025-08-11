import Resolver from '@forge/resolver';
import { storage, fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getStart', async (req) => {
    const example = await storage.getSecret('application-key');
    // return example
    let value
    if (example === undefined) {
        value = 0
    }
    else {
        value = 1
    }

    return value
});


resolver.define('getCredentials', async (req) => {

    const { data } = req.payload

    const gt = await storage.setSecret('application-key', data);
    const example = await storage.getSecret('application-key');
    const credentials = JSON.parse(example)
    return credentials.FID

});

const getaccessToken = async () => {
    const credentials = await storage.getSecret('application-key')
    const data = JSON.parse(credentials)
    const AppID = data.FID
    const ClientSec = data.SID
    const TenantId = data.TID
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', AppID);
    requestBody.append('client_secret', ClientSec);
    requestBody.append('scope', 'https://graph.microsoft.com/.default');
    try {
        const response = await fetch(`https://login.microsoft.com/${TenantId}/oauth2/v2.0/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestBody.toString(),

        })
        if (response.ok) {
            const responseData = await response.json()
            const access_token = responseData.access_token
            const AccessToken = await storage.setSecret('my_access_token', access_token);
            return "Successfully Connected!"
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getRootSite = async () => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/sites/root", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getAllSites = async () => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/sites", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getsiteinfo = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getdrive = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${id}/drives`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getlist = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${id}/lists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getsubsites = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${id}/sites`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getdriveinfo = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${id}/root/children`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getiteminfo = async (id, driveId) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${id}/children`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}
const getlistinfo = async (id, siteid) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${id}/items`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getSiteById = async (id) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getlistById = async (id, listid, siteid) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${listid}/items/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        // return `https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${listid}/items/${id}`
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

const getcolumnname = async (listid, siteid) => {
    const AccessToken = await storage.getSecret('my_access_token');
    try {
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${listid}/columns`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            },
        })
        // return `https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${listid}/columns`
        // // return `https://graph.microsoft.com/v1.0/sites/${siteid}/lists/${listid}/items/${id}`
        if (response.ok) {
            const responseData = await response.json()
            return responseData.value
        }
        else if (response.status === 401) {
            const msg = getaccessToken()
            return msg
        }
        else {
            return `Request failed with status ${response.status}`
        }
    }
    catch (error) {
        return `Error fetching data:${error}`
    }
}

resolver.define('getToken', async () => {
    const response = getaccessToken()
    return response
})

resolver.define('getRoot', async () => {
    let response = getRootSite()
    if (response === "Successfully Connected!") {
        response = getRootSite()
        return response
    }
    return response
})


resolver.define('getSites', async () => {
    let response = getAllSites()
    if (response === "Successfully Connected!") {
        response = getAllSites()
        return response
    }
    return response
})

resolver.define('getsiteinfo', async (req) => {
    const { data } = req.payload
    let response = getsiteinfo(data)
    if (response === "Successfully Connected!") {
        response = getsiteinfo(data)
        return response
    }
    return response

})

resolver.define('getsubsites', async (req) => {
    const { data } = req.payload
    let response = getsubsites(data)
    if (response === "Successfully Connected!") {
        response = getsubsites(data)
        return response
    }
    return response
})

resolver.define('getdrive', async (req) => {
    const { data } = req.payload
    let response = getdrive(data)
    if (response === "Successfully Connected!") {
        response = getdrive(data)
        return response
    }
    return response
})

resolver.define('getlist', async (req) => {
    const { data } = req.payload
    let response = getlist(data)
    if (response === "Successfully Connected!") {
        response = getlist(data)
        return response
    }
    return response
})

resolver.define('getSiteById', async (req) => {
    const { data } = req.payload
    let response = getSiteById(data)
    if (response === "Successfully Connected!") {
        response = getSiteById(data)
        return response
    }
    return response
})

resolver.define('getdriveinfo', async (req) => {
    const { data } = req.payload
    let response = getdriveinfo(data)
    if (response === "Successfully Connected!") {
        response = getdriveinfo(data)
        return response
    }
    return response
})

resolver.define('getiteminfo', async (req) => {
    const { id, driveId } = req.payload
    let response = getiteminfo(id, driveId)
    if (response === "Successfully Connected!") {
        response = getiteminfo(id, driveId)
        return response
    }
    return response
})

resolver.define('getlistinfo', async (req) => {
    const { id, siteid } = req.payload
    let response = getlistinfo(id, siteid)
    if (response === "Successfully Connected!") {
        response = getlistinfo(id, siteid)
        return response
    }
    return response
})

resolver.define('getlistById', async (req) => {
    const { id, listid, siteid } = req.payload
    let response = getlistById(id, listid, siteid)
    if (response === "Successfully Connected!") {
        response = getlistById(id, listid, siteid)
        return response
    }
    return response
})

resolver.define('getcolumnname', async (req) => {
    const { listid, siteid } = req.payload
    let response = getcolumnname(listid, siteid)
    if (response === "Successfully Connected!") {
        response = getcolumnname(listid, siteid)
        return response
    }
    return response
})

export const macroHandler = async () => {
    return {
      result: {
        type: 'json',
        value: {
          name: 'My Macro',
          key: 'my-macro',
          description: 'A custom macro that displays a file and adds it to the page.',
        },
      },
    };
  };
  

export const handler = resolver.getDefinitions();

