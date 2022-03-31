import { Pelipper } from '@hello/pelipper';

const pelipper = new Pelipper({
    env: process.env.APOLLO_FRONTEND_ENV,
    namespaceName: process.env.APOLLO_ADMIN_FRONTEND_NAMESPAVE,
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
