// const app = require('./');
const express = require('express');

var pages = require('node-github-pages')(express(), {
    static: 'public',
    path: 'dist',
});
pages.renderFiles([
    {
        view: 'index.ejs',
        url: '',
        options: { header: undefined, pages: ['about, projects, resume'] },
    },
    {
        view: 'about.ejs',
        url: '/about',
        options: { header: 'about', pages: ['about, projects, resume'] },
    },
    {
        view: 'projects.ejs',
        url: '/projects',
        options: { header: 'projects', pages: ['about, projects, resume'] },
    },
    {
        view: 'resume.ejs',
        url: '/resume',
        options: { header: 'resume', pages: ['about, projects, resume'] },
    },
]);
