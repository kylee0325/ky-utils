import { Pelipper } from '@hello/pelipper';

const pelipper = new Pelipper({
    env: process.env.APOLLO_FRONTEND_ENV,
    appId: 'ziqu7514',
    namespaceName: 'marketing-modules',
});

pelipper.onChange(() => {
    Object.keys(pelipper.config).forEach((key) => {
        try {
            const value = JSON.parse(pelipper.config[key]);
            pelipper.config[key] = value;
        } catch (error) {}
    });
});

export default pelipper;
