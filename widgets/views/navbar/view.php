<nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bgcolor-green ">

    <div class="dropdown calcite-dropdown calcite-text-dark calcite-bg-light" role="presentation">
      <a class="dropdown-toggle" role="menubutton" aria-haspopup="true" aria-expanded="false" tabindex="0">
        <div class="calcite-dropdown-toggle">
          <span class="sr-only">Toggle dropdown menu</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
      <ul class="dropdown-menu" role="menu">
        <?php foreach ($menu as $item): ?>
        <li><a role="menuitem" tabindex="0" href="#" data-target="<?=$item['data-target']?>" aria-haspopup="true"><span class="<?=$item['class']?>"></span> <?=$item['text']?></a></li>
        <?php endforeach?>
      </ul>
    </div>

    <div class="calcite-title calcite-overflow-hidden">
      <span class="calcite-title-main"><?=$title?></span>
      <span class="calcite-title-divider hidden-xs"></span>
      <span class="calcite-title-sub hidden-xs"><?=$subtitle?></span>
    </div>

    <ul class="nav navbar-nav calcite-nav">
      <li>
        <div class="calcite-navbar-search calcite-search-expander">
          <div id="searchWidgetDiv"></div>
        </div>
      </li>
    </ul>
</nav>
