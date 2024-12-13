import http from 'k6/http';
import { check, sleep } from 'k6';

// Your custom GUID generator function
const guid_generate = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export let options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Test duration
};

export default function () {
    const url = 'https://bll-plainid-stg.hq.il.bleumi/api/runtime/5.0/decisions';
    
    const headers = {
        'Content-Type': 'application/json',
        'X-Client-Id': '"placeholder"',
        'x-request-id': guid_generate(),
        'Authorization': 'Bearer "placeholder"', // Replace with your actual token
    };

    const body = JSON.stringify({
        method: "GET",
        headers: {
            accept: ["application/json"],
            authorization: ["Bearer "placeholder""],
            host: [""placeholder""],
            traceparent: ["00-c24550382a4b1935da023962e7447ae7-d9f9d47c03ace8c7-00"],
            "x-apg-apikey": [""placeholder""],
            "x-apigee-global-messageid": ["linx102083t57-79394-42427177-1"],
            "x-app-id": ["4185056a-2ba3-463e-9e6c-dec3d85ba070"],
            "x-channel-id": [""placeholder""],
            "x-forwarded-for": [""placeholder""],
            "x-forwarded-port": [""placeholder""],
            "x-forwarded-proto": ["http"],
            "x-ip-id": ["10.0.0.1"],
            "x-message-id": guid_generate(),
            "x-trace-id": guid_generate(),
            "x-transaction-id": [""placeholder""],
            "x-user-id": guid_generate(),
            "x-uuid-id": ["be829616-c0d3-441a-b506-a81efda5158c"]
        },
        uri: {
            schema: "http",
            authority: {
                userinfo: null,
                host: null,
                port: null
            },
            path: [
              "placeholder"
            ],
            query: {
                directDebitStatus: "0",
                returnsIndicator: "0"
            },
            fragment: ""
        },
        body: "",
        meta: {
            runtimeFineTune: {
                combinedMultiValue: "true",
                includeDenyReason: "true",
                includeDetails: "true",
                skipUnneededOrUnavailableIdentitySources: "true",
                includePartialIdentitySourcesIndication: "true",
                includeIdentity: "true",
                includeAccessPolicy: "true",
                includeAssetAttributes: "true",
                includeContext: "true"
            }
        }
    });

    let res = http.post(url, body, { headers });

    // Check the response
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body && r.body.length > 0,
    });

    sleep(1); // Pause between iterations
}