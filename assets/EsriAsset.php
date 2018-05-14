<?php

namespace app\assets;

use yii\web\AssetBundle;

class EsriAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    public $css = [
        'https://js.arcgis.com/4.7/esri/css/main.css',
    ];

    public $js = [
        'https://js.arcgis.com/4.7/',
    ];
}
