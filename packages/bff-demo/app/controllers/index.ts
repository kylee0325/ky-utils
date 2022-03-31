import './upgrade-browser';
import './maintain';
import './oauth';

if (process.env.DIND_RUNTIME_ENV_NAME === 'private') {
    require('./private');
} else {
    require('./home');
}
