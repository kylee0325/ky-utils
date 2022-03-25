/**
 * oss 图片 url 优化处理
 */

const isBrowser = typeof window !== 'undefined';
let supportsWebp = false;

supportsWebp = (function () {
    try {
        return (
            document
                .createElement('canvas')
                .toDataURL('image/webp', 0.5)
                .indexOf('data:image/webp') === 0
        );
    } catch (err) {
        return false;
    }
})();

export function ossUrl(
    url: string,
    options: {
        width?: number;
        height?: number;
        type?: string;
        allowJPGOnUnsupportedWebp?: boolean;
        scaleType?: string;
        minDpr?: number;
        supportWebp?: boolean;
        useDpr?: boolean;
        resizeType?: number;
        crop?: {
            width: number;
            height: number;
        };
        useResize?: boolean;
    } = {},
) {
    if (!/dancf\.com/.test(url) && !/aliyuncs\.com/.test(url)) return url;
    if (/\.svg$/i.test(url)) return url;
    const {
        width,
        height,
        type = 'webp',
        scaleType,
        minDpr = 1.5,
        useDpr = true,
        resizeType = 0,
        crop,
        useResize = false,
    } = options;
    let src = url + '?x-oss-process=';
    if (useResize || ((width || height) && !/\.gif$/.test(url))) {
        src += 'image/resize';

        // 最大限制 2， 防止图片过大， 最小1.5 保证图片清晰
        const dpr = useDpr
            ? Math.min(2, isBrowser ? Math.max(devicePixelRatio, minDpr) : minDpr)
            : 1;

        if (width) {
            src += `,w_${Math.round(width * dpr)}`;
        }
        if (height) {
            src += `,h_${Math.round(height * dpr)}`;
        }
        if (scaleType) {
            // https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1383.36e335a8pxsRMg
            src += `,m_${scaleType}`;
        }
        if (resizeType === 6) {
            src += ',type_6';
        }
        if (crop) {
            src += '/crop';
            if (crop.width) {
                src += `,w_${Math.round(crop.width)}`;
            }
            if (crop.height) {
                src += `,h_${Math.round(crop.height)}`;
            }
        }
        src += '/interlace,1,';
    }

    if (type && !/\.svg$/.test(url)) {
        if (type === 'webp' || /\.webp$/.test(url)) {
            if (options.supportWebp || supportsWebp) {
                src += `image/format,${type},`;
            } else if (options.allowJPGOnUnsupportedWebp && !/\.gif$/.test(url)) {
                src += 'image/format,jpg,';
            }
        } else {
            src += `image/format,${type},`;
        }
    }
    if (/\?x-oss-process=$/.test(src)) return url;
    return src.replace(/,$/, '');
}

export function ossVideoSnapshot(
    url: string,
    options: {
        time?: number;
        width?: number;
        height?: number;
        mode?: 'fast';
        format?: 'png' | 'jpg';
        autoRotation?: 'auto';
    },
) {
    if (!/dancf\.com/.test(url) && !/aliyuncs\.com/.test(url)) return url;
    if (/\.svg$/i.test(url)) return url;
    const { width, height, time = 0, mode, format = 'jpg', autoRotation } = options;
    let src = `${url}?x-oss-process=video/snapshot`;
    src += `,t_${time}`;
    if (width) {
        src += `,w_${width}`;
    }
    if (height) {
        src += `,h_${height}`;
    }
    if (mode) {
        src += `,m_${mode}`;
    }
    src += `,f_${format}`;
    if (autoRotation) {
        src += `,ar_${autoRotation}`;
    }
    return src;
}
