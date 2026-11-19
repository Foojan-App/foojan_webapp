<?php
$items = $args['content']['items'] ?? [];
$length = max(1, mb_strlen(implode(' ', $items)));
fz_part('ticker', ['items' => $items, 'repeat' => $length >= 80 ? 1 : (int) ceil(160 / $length)]);
