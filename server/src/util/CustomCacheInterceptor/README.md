
# To Use a Single Interceptor for All Modules
`app.module.ts:`
```
import { CacheModule, CacheInterceptor } from "@nestjs/common";
imports: [
    CacheModule.register({ isGlobal: true, max: 100 }),
    // ...
]
providers: [
    // ...
    {
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor, // or CustomCacheInterceptor
    },
]
```

`[any].controller.base.ts:`

```
import { CacheKey, CacheTTL } from "@nestjs/common";

// Usage:
@CacheKey('key_name')
@CacheTTL(200000) // in seconds
```
----------------------------------
# To Use Module-Level Interceptor
`[any].module.ts:`
```
import { Module, CacheModule } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    // ...
    imports: [
        // ...
        CacheModule.register({ max: 100 })
    ],
    providers: [
        // ...
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor, // or CustomCacheInterceptor
        }
    ],
    // ...
})
```

`[any].controller.base.ts:`
```
import { CacheKey, CacheTTL } from "@nestjs/common";

// Usage:
@CacheKey('key_name')
@CacheTTL(200000) // in seconds
```

--------------------------------------------
# To Use Single Endpoint Level (Controller)
`[any].module.ts:`

```
import { Module, CacheModule } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    // ...
    imports: [
        // ...
        CacheModule.register({ max: 100 })
    ],
    // ...
})
```
`[any].controller.base.ts:`
```
import { CacheKey, CacheTTL } from "@nestjs/common";

// Usage:
@UseInterceptors(CustomCacheInterceptor2)
@CacheKey('key_name')
@CacheTTL(200000) // in seconds
```
--------------------------------------------
# CacheModule.register settings:
```
CacheModule.register({
    ttl: 5, // time to live in seconds
    max: 10, // maximum number of items in cache
    isGlobal: true, // global cache manager (if using in app.module)
})
```
--------------------------------------------
# CustomCacheInterceptor example:
```
// import { CacheInterceptor } from '@nestjs/cache-manager'; // CacheInterceptor from nestjs/common instead of @nestjs/cache-manager
import { ExecutionContext, Injectable, CacheInterceptor, CACHE_KEY_METADATA } from '@nestjs/common';
import { getUser } from './auth/gqlUserData.decorator';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
    protected cachedRoutes = new Map();
    trackBy(context: ExecutionContext): string | undefined {
        console.log("CUSTOM INTERCEPTOR STARTED")
        const request = context.switchToHttp().getRequest();
        // GraphQL Request:
        // if there is no request, the incoming request is graphql, therefore bypass response caching.
        // later we can get the type of request (query/mutation) and if query get its field name, and attributes and cache accordingly. Otherwise, clear the cache in case of the request type is mutation.
        if (!request) {
            return undefined; // don't return cached data
        }
        
        const { httpAdapter } = this.httpAdapterHost;
        
        const user = getUser(context) // contains user data such as id, username, roles, ...
        const cacheKey: string = this.reflector.get(CACHE_KEY_METADATA, context.getHandler()); // returns Cache key // CACHE_KEY_METADATA, example: cache_module:cache_key
        const requestUrl: string = httpAdapter.getRequestUrl(request) // example: /api/app-configs
        const requestMethod: string = httpAdapter.getRequestMethod(request) // example: GET
        const isHttpApp: boolean = httpAdapter && !!httpAdapter.getRequestMethod;
        const isGetRequest: boolean = requestMethod === 'GET';

        // <*
        // Clearing Cached Routes for non-GET requests:
        if (!isGetRequest) {
            setTimeout(async () => {
                for (const values of this.cachedRoutes.values()) {
                    for (const value of values) {
                        // you don't need to worry about the cache manager as you are extending their interceptor which is using caching manager as you've seen earlier.
                        await this.cacheManager.del(value);
                    }
                }
            }, 0);
            return undefined; // don't return cached data
        }
        // Updating Cached Routes:
        // to always get the base url of the incoming get request url.
        const key = requestUrl.split('?')[0];
        if (this.cachedRoutes.has(key) && !this.cachedRoutes.get(key).includes(requestUrl)) {
            this.cachedRoutes.set(key, [...this.cachedRoutes.get(key), requestUrl]);
            return httpAdapter.getRequestUrl(request);
        }
        // Setting Cached Routes:
        this.cachedRoutes.set(key, [requestUrl]);
        // *>

        return httpAdapter.getRequestUrl(request); // return cached data
    }
}

```
# References
```
https://docs.nestjs.com/techniques/caching
https://dev.to/secmohammed/nestjs-caching-globally-neatly-1e17
https://stackoverflow.com/questions/54508534/i-want-to-implement-custom-caching-in-nestjs
```