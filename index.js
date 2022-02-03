'use strict';

const koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-ejs');
const path = require('path');

const app = new koa();
const router = new Router();

render(app, {
   root: path.join(__dirname, 'views'),
   layout: 'index',
   viewExt: 'html',
    cache: 'false',
    debug: true
});
router.get('koa-example', '/', (ctx) => {
    let koalaFacts = [];

    koalaFacts.push({
        meta_name: 'Color',
        mata_value: 'Black and White'
    });
    koalaFacts.push({
        meta_name: 'Native Country',
        mata_value: 'Australia'
    });
    koalaFacts.push({
        meta_name: 'Animal Classification',
        mata_value: 'Mammal'
    });
    koalaFacts.push({
        meta_name: 'Life Span',
        mata_value: '13-18 years'
    });
    koalaFacts.push({
        meta_name: 'Are they bears?',
        mata_value: 'No'
    });

    return ctx.render('index', {
        attributes: koalaFacts
    });

    ctx.body = 'Hello World';
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
        try{
            await next()
        } catch(err) {
            console.log(console.status);
            ctx.status = err.status || 500;
            ctx.body = err.message;
        }
    });

app.listen(1234);