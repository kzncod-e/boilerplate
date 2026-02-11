module.exports = {
    apps: [
        {
            name: "boilerplate-nextjs",
            cwd: "/home/ubuntu25/boilerplate-nextjs/current",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3010 -H 0.0.0.0",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
