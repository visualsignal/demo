"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
exports.handler = async (event) => {
    console.debug('received new request', JSON.stringify(event, null, 2));
    const VS_BASE_URL = process.env.VS_BASE_URL;
    const API_BASE_URL = `https://auth.${VS_BASE_URL}`;
    const API_KEY = process.env.VS_API_KEY;
    const api = axios_1.default.create({
        baseURL: API_BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-vs-apikey': API_KEY
        }
    });
    let body, displayName, room;
    try {
        body = JSON.parse(event.body);
        displayName = body.displayName;
        room = body.room;
    }
    catch (e) {
        console.error('unable to process received body', e.message, e.stack);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: 'invalid body'
        };
    }
    const handle = uuid_1.v4();
    let response;
    try {
        response = await api.post('/auth', {
            room,
            handle,
            permissions: {
                audio: true,
                video: true
            },
            appData: {
                displayName
            }
        });
    }
    catch (e) {
        console.error('unable to fetch token from visualsignal', e.message, e.stack);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: 'error fetching token'
        };
    }
    const { token, id } = response.data;
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ token, id, handle, room })
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsK0JBQW1DO0FBRXRCLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQWdCLEVBQUU7SUFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQTtJQUMzQyxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsV0FBVyxFQUFFLENBQUE7SUFDbEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUE7SUFFdEMsTUFBTSxHQUFHLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztRQUN2QixPQUFPLEVBQUUsWUFBWTtRQUNyQixPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsYUFBYSxFQUFFLE9BQU87U0FDdkI7S0FDRixDQUFDLENBQUE7SUFHRixJQUFJLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFBO0lBQzNCLElBQUk7UUFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEUsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7YUFDekM7WUFDRCxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFBO0tBQ0Y7SUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFNLEVBQUUsQ0FBQTtJQUN2QixJQUFJLFFBQVEsQ0FBQTtJQUNaLElBQUk7UUFDRixRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxJQUFJO1lBQ0osTUFBTTtZQUNOLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFdBQVc7YUFDWjtTQUNGLENBQUMsQ0FBQTtLQUNIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVFLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQ3pDO1lBQ0QsSUFBSSxFQUFFLHNCQUFzQjtTQUM3QixDQUFBO0tBQ0Y7SUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFFbkMsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsNkJBQTZCLEVBQUUsR0FBRztZQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO1NBQ3pDO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNsRCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCdcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gIGNvbnNvbGUuZGVidWcoJ3JlY2VpdmVkIG5ldyByZXF1ZXN0JywgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKVxuICBjb25zdCBWU19CQVNFX1VSTCA9IHByb2Nlc3MuZW52LlZTX0JBU0VfVVJMXG4gIGNvbnN0IEFQSV9CQVNFX1VSTCA9IGBodHRwczovL2F1dGguJHtWU19CQVNFX1VSTH1gXG4gIGNvbnN0IEFQSV9LRVkgPSBwcm9jZXNzLmVudi5WU19BUElfS0VZXG5cbiAgY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBBUElfQkFTRV9VUkwsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtdnMtYXBpa2V5JzogQVBJX0tFWVxuICAgIH1cbiAgfSlcblxuXG4gIGxldCBib2R5LCBkaXNwbGF5TmFtZSwgcm9vbVxuICB0cnkge1xuICAgIGJvZHkgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gICAgZGlzcGxheU5hbWUgPSBib2R5LmRpc3BsYXlOYW1lXG4gICAgcm9vbSA9IGJvZHkucm9vbVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcigndW5hYmxlIHRvIHByb2Nlc3MgcmVjZWl2ZWQgYm9keScsIGUubWVzc2FnZSwgZS5zdGFjaylcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlXG4gICAgICB9LFxuICAgICAgYm9keTogJ2ludmFsaWQgYm9keSdcbiAgICB9XG4gIH1cblxuICBjb25zdCBoYW5kbGUgPSB1dWlkdjQoKVxuICBsZXQgcmVzcG9uc2VcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvYXV0aCcsIHtcbiAgICAgIHJvb20sXG4gICAgICBoYW5kbGUsXG4gICAgICBwZXJtaXNzaW9uczoge1xuICAgICAgICBhdWRpbzogdHJ1ZSxcbiAgICAgICAgdmlkZW86IHRydWVcbiAgICAgIH0sXG4gICAgICBhcHBEYXRhOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ3VuYWJsZSB0byBmZXRjaCB0b2tlbiBmcm9tIHZpc3VhbHNpZ25hbCcsIGUubWVzc2FnZSwgZS5zdGFjaylcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlXG4gICAgICB9LFxuICAgICAgYm9keTogJ2Vycm9yIGZldGNoaW5nIHRva2VuJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHsgdG9rZW4sIGlkIH0gPSByZXNwb25zZS5kYXRhXG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNDb2RlOiAyMDEsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWVcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdG9rZW4sIGlkLCBoYW5kbGUsIHJvb20gfSlcbiAgfVxufVxuIl19