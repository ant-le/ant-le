# Styling

For styling, I want to make use of the tailwindv4 features that are mainly defined in the app.css as entry.
Hereby, svelte components should be defined purely with tailwind classes to ensure my styles to work
as globally defined in app.css

I want to introduce two main styles defined in @theme:

1. Minimal Style (default theme)
   This style should be a very simple and minimal theme around the color palette:
   taupe: #463f3aff;
   battleship-gray: #8a817cff;
   silver: #bcb8b1ff;
   isabelline: #f4f3eeff;
   melon: #e0afa0ff;

The background should be dark and text colors and elements chosen accordingly

2. Artisic Style (aceessable with artistic:)
   This color scheme should have a brighter background (e.g. #F5F5F5) and a psychadelic
   touch with a color palette like:
   royal-purple: #3A2170;
   marigold: #DB831C;
   crimson: #BE2924;
   watermelon: #DE4959;
   peacock-lue: #11808C;

## Coloring and Font

The coloring and font definitio should work by defining both themes in app.css like:

```
/* src/app.css */
@import "tailwindcss";

@theme {
  /* ... define minimal (default) mode colors ... */
  --color-primary: #c3e2c2;

}

@custom-variant artistic (&:where([data-theme=artistic], [data-theme=artistic] *));
@layer theme {
    @variant artistic {
      /* ... define artistic colors ... */
    --color-primary: #e5e5e5;

    }
}
```

Then,the color can be specified in each tailwind class. An example for setting the
background color would be:

```
<div class="bg-primary">
```

## Styling

The tailwind classes shopuld look differently depending
on the style: Herefore, we will use the 'artistic:'-prefix to
define the artistic theme. IMPORTANMT: as coloring and fonts are defined elsewhere, you only need to define
them once. The conditioning should be only used for
changing the layout and style of the tailwind class.

```
<div
  class="
    /* 'artistic' theme */
    p-4 bg-bg-base shadow-card rounded-md border border-transparent
    flex items-center gap-4

    /* 'minimalistic' theme */
    artistic:flex-col artistic:text-center artistic:p-8
    artistic:rounded-2xl artistic:border-4 artistic:border-primary
  "
>
```

Hereby, it is important to note that properties do not need to be defined twice. Hence,
the "artisitc:"-prefix should only be used if values need to be overwritten!
