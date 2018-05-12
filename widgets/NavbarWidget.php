<?php

namespace app\widgets;

use yii\base\Widget;

class NavbarWidget extends Widget
{

    public $title;
    public $subtitle;
    public $menu;

    public function init()
    {
        parent::init();
        if ($this->menu === null) {
            $this->menu = [
                [
                    'class' => 'glyphicon glyphicon-fullscreen',
                    'data-target' => '',
                    'text' => 'Full Map',
                ],
            ];
        }

        if ($this->title === null) {
            $this->title = 'Mapas Dinámicos';
        }

        if ($this->subtitle === null) {
            $this->subtitle = '.';
        }
    }

    public function run()
    {
        return $this->render('navbar/view', ['menu' => $this->menu, 'title' => $this->title, 'subtitle' => $this->subtitle]);
    }

}
