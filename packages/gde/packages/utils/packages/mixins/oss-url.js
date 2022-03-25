import { ossUrl, ossVideoSnapshot } from '../_utils/oss-url';

export default {
    methods: {
        ossUrl(url, options) {
            return ossUrl(url, options);
        },
        ossVideoSnapshot(url, options) {
            return ossVideoSnapshot(url, options);
        },
    },
};
