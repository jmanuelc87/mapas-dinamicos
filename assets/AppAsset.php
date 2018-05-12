<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.0.1/css/calcite-web.min.css',
        'https://esri.github.io/calcite-maps/dist/css/calcite-maps-bootstrap.min-v0.7.css',
        'https://esri.github.io/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.7.css',
        'https://js.arcgis.com/4.7/esri/css/main.css',
        'css/site.css',
    ];
    public $js = [
        'js/dojoConfig.js',
        'https://js.arcgis.com/4.7/',
        'js/main.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
