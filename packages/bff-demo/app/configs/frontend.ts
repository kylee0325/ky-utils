import { Pelipper } from '@hello/pelipper';

const pelipper = new Pelipper({
    department: '',
    appId: process.env.APOLLO_FRONTEND_APP_ID, // qiye-bff
    env: process.env.APOLLO_FRONTEND_ENV,
    namespaceName: process.env.APOLLO_FRONTEND_NAMESPACE,
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
