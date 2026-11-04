<?php
/**
 * SNIPPET DE WORDPRESS: BOTÓN "PLATAFORMA VIRTUAL" EN EL HEADER
 * 
 * Si tu otro proyecto también utiliza WordPress, puedes pegar este código
 * en el archivo `functions.php` de tu tema hijo.
 */

// 1. Inyectar el botón al final del menú principal
add_filter('wp_nav_menu_items', 'custom_agregar_boton_plataforma_menu', 10, 2);

function custom_agregar_boton_plataforma_menu( $items, $args ) {
    // Reemplaza 'menu-1' o 'primary' con la ubicación de menú de tu nuevo tema
    if ( $args->theme_location == 'menu-1' || $args->theme_location == 'primary' ) {
        
        $url_plataforma = 'https://cysvirtual.cl/login/index.php';
        $texto_boton    = 'Plataforma Virtual';

        $boton_html = '
        <li class="menu-item header_btn_wrapper" style="list-style: none; display: inline-block;">
            <a href="' . esc_url( $url_plataforma ) . '" 
               class="btn btn-primary menu_custom_btn" 
               target="_blank" 
               rel="noopener noreferrer"
               style="background:#043364; color:#fff; padding:8px 16px; border:2px solid #000; text-transform:uppercase; font-weight:bold; text-decoration:none; display:inline-block;">
                ' . esc_html( $texto_boton ) . '
            </a>
        </li>';

        $items .= $boton_html;
    }

    return $items;
}

