export type BlogLocale = 'en' | 'de'

type LocalizedText = Record<BlogLocale, string>

export type BlogCategoryKey =
    | 'notes'
    | 'running'
    | 'music'
    | 'design'
    | 'study'
    | 'projects'

export type BlogPost = {
    slug: string
    date: string
    categoryKey: BlogCategoryKey
    category: LocalizedText
    image: string
    title: LocalizedText
    excerpt: LocalizedText
    body: Record<BlogLocale, string[]>
}

export type LocalizedBlogPost = {
    slug: string
    date: string
    categoryKey: BlogCategoryKey
    category: string
    image: string
    title: string
    excerpt: string
    body: string[]
}

export const posts: BlogPost[] = [
    {
        slug: 'hello-blog',
        date: '2026-06-05',
        categoryKey: 'notes',
        category: { en: 'Notes', de: 'Notizen' },
        image: '/images/profile.webp',
        title: { en: 'Hello Blog', de: 'Hallo Blog' },
        excerpt: {
            en: 'A small starting point for notes, ideas, and longer writing.',
            de: 'Ein kleiner Startpunkt für Notizen, Ideen und längere Texte.',
        },
        body: {
            en: [
                'This is the first post in the new blog route.',
                'The page is served through SvelteKit dynamic routing, so each post lives behind /blog/[slug].',
                'This longer test body is here to make the modal scroll behavior obvious. The popup should stay locked in one place while this content scrolls inside the bordered panel.',
                'A good modal should not drag the page behind it. The surrounding blog list, sticky title card, and header should remain visually still while the reader moves through the post text.',
                'The content can be much longer than the preview card because the preview only needs enough context to decide whether to open the article.',
                'Inside the modal, scrolling should feel contained. Reaching the top or bottom of this panel should not suddenly move the page underneath.',
                'This paragraph adds more height so the test works on both desktop and smaller screens. The close button and full-page link should remain easy to reach at the top of the popup.',
                'For a real post, this area could hold longer notes, sections, links, code snippets, or images. The popup is only the quick reading surface.',
                'The dynamic route still exists for the same post, so the modal can offer a stable full-page URL without forcing every preview click to navigate away.',
                'This is useful when someone wants to share a post directly, bookmark it, or read it in a normal page layout instead of the overlay.',
                'The main thing to verify now is that the popup dimensions do not change based on the post length. The text should scroll inside the fixed-size panel.',
                'If this paragraph is visible after scrolling within the popup, the test content is doing its job.',
            ],
            de: [
                'Das ist der erste Beitrag in der neuen Blog-Route.',
                'Die Seite nutzt dynamisches Routing von SvelteKit, daher liegt jeder Beitrag hinter /blog/[slug].',
                'Dieser längere Testtext macht das Scrollverhalten des Modals sichtbar. Das Popup soll an einer festen Stelle bleiben, während dieser Inhalt im umrandeten Panel scrollt.',
                'Ein gutes Modal sollte die Seite im Hintergrund nicht mitziehen. Blogliste, Titelkarte und Header sollen visuell ruhig bleiben, während man durch den Text liest.',
                'Der Inhalt darf viel länger sein als die Vorschaukarte, denn die Vorschau braucht nur genug Kontext, um den Artikel zu öffnen.',
                'Im Modal soll sich Scrollen begrenzt anfühlen. Wenn man oben oder unten ankommt, darf nicht plötzlich die Seite darunter weiterlaufen.',
                'Dieser Absatz erzeugt zusätzliche Höhe, damit der Test auf Desktop und kleineren Screens funktioniert. Schließen und Vollseite sollen oben gut erreichbar bleiben.',
                'In einem echten Beitrag könnten hier längere Notizen, Abschnitte, Links, Codebeispiele oder Bilder stehen. Das Popup ist nur die schnelle Lesefläche.',
                'Die dynamische Route existiert weiterhin für denselben Beitrag, sodass das Modal eine stabile Vollseiten-URL anbieten kann.',
                'Das ist nützlich, wenn jemand einen Beitrag direkt teilen, speichern oder lieber in einem normalen Seitenlayout lesen möchte.',
                'Wichtig ist jetzt, dass sich die Popup-Größe nicht durch die Länge des Beitrags verändert. Der Text soll im festen Panel scrollen.',
                'Wenn dieser Absatz nach dem Scrollen im Popup sichtbar ist, erfüllt der Testinhalt seinen Zweck.',
            ],
        },
    },
    {
        slug: 'running-notes',
        date: '2026-05-28',
        categoryKey: 'running',
        category: { en: 'Running', de: 'Laufen' },
        image: '/images/anton.webp',
        title: { en: 'Running Notes', de: 'Laufnotizen' },
        excerpt: {
            en: 'A quick log about training rhythm, recovery, and keeping the legs honest.',
            de: 'Ein kurzer Log über Trainingsrhythmus, Erholung und ehrliche Beine.',
        },
        body: {
            en: [
                'The most useful training weeks are rarely dramatic. They are built from repeatable runs, enough sleep, and avoiding the temptation to turn every session into a race.',
                'This note is a placeholder for longer running reflections and gives the blog list enough height to test the scroll reveal behavior.',
            ],
            de: [
                'Die nützlichsten Trainingswochen sind selten dramatisch. Sie bestehen aus wiederholbaren Läufen, genug Schlaf und der Disziplin, nicht jede Einheit zum Rennen zu machen.',
                'Diese Notiz ist ein Platzhalter für längere Laufreflexionen und gibt der Blogliste genug Höhe, um das Scroll-Reveal-Verhalten zu testen.',
            ],
        },
    },
    {
        slug: 'music-rotation',
        date: '2026-05-12',
        categoryKey: 'music',
        category: { en: 'Music', de: 'Musik' },
        image: '/images/lama.jpg',
        title: { en: 'Music Rotation', de: 'Musikrotation' },
        excerpt: {
            en: 'Albums and sounds that have been looping in the background lately.',
            de: 'Alben und Sounds, die zuletzt im Hintergrund liefen.',
        },
        body: {
            en: [
                'Some records work best as complete rooms rather than collections of songs. They change how the day feels while they are playing.',
                'This mock entry helps exercise the modal layout with text that is longer than the preview card.',
            ],
            de: [
                'Manche Platten funktionieren eher wie ganze Räume als wie Sammlungen einzelner Songs. Sie verändern, wie sich der Tag anfühlt.',
                'Dieser Testeintrag prüft das Modal-Layout mit Text, der länger ist als die Vorschaukarte.',
            ],
        },
    },
    {
        slug: 'small-interface-rules',
        date: '2026-04-21',
        categoryKey: 'design',
        category: { en: 'Design', de: 'Design' },
        image: '/images/kristian.jpg',
        title: { en: 'Small Interface Rules', de: 'Kleine Interface-Regeln' },
        excerpt: {
            en: 'A few constraints that make interfaces feel sharper without adding complexity.',
            de: 'Ein paar Grenzen, die Interfaces klarer machen, ohne Komplexität zu erhöhen.',
        },
        body: {
            en: [
                'Strong borders, clear spacing, and deliberate color changes can do more than a pile of decorative elements.',
                'The goal is not to make everything loud. The goal is to make every visible decision feel intentional.',
            ],
            de: [
                'Starke Ränder, klare Abstände und bewusste Farbwechsel können mehr leisten als viele dekorative Elemente.',
                'Das Ziel ist nicht, alles laut zu machen. Das Ziel ist, jede sichtbare Entscheidung absichtlich wirken zu lassen.',
            ],
        },
    },
    {
        slug: 'study-checkpoint',
        date: '2026-04-03',
        categoryKey: 'study',
        category: { en: 'Study', de: 'Studium' },
        image: '/images/tilman.jpg',
        title: { en: 'Study Checkpoint', de: 'Studien-Checkpoint' },
        excerpt: {
            en: 'What is worth tracking when switching between lectures, projects, and practice.',
            de: 'Was sich lohnt zu tracken, wenn man zwischen Vorlesungen, Projekten und Übung wechselt.',
        },
        body: {
            en: [
                'The useful checkpoint is not just what was finished, but what became easier to explain afterward.',
                'Short writing after a study block exposes the gaps that passive rereading hides.',
            ],
            de: [
                'Der nützliche Checkpoint ist nicht nur, was erledigt wurde, sondern was sich danach leichter erklären lässt.',
                'Kurzes Schreiben nach einem Lernblock zeigt Lücken, die passives Wiederlesen versteckt.',
            ],
        },
    },
    {
        slug: 'weekend-build',
        date: '2026-03-16',
        categoryKey: 'projects',
        category: { en: 'Projects', de: 'Projekte' },
        image: '/images/profile.webp',
        title: { en: 'Weekend Build', de: 'Wochenend-Build' },
        excerpt: {
            en: 'A small project note about cutting scope until something usable remains.',
            de: 'Eine kleine Projektnotiz darüber, Scope zu kürzen, bis etwas Nutzbares übrig bleibt.',
        },
        body: {
            en: [
                'A weekend build only works when the idea is aggressively reduced. One good interaction is better than five unfinished screens.',
                'This entry is here to make sure the sticky title card remains fixed while more cards scroll past it.',
            ],
            de: [
                'Ein Wochenend-Build funktioniert nur, wenn die Idee radikal reduziert wird. Eine gute Interaktion ist besser als fünf unfertige Screens.',
                'Dieser Eintrag stellt sicher, dass die sticky Titelkarte stehen bleibt, während weitere Karten daran vorbeiscrollen.',
            ],
        },
    },
    {
        slug: 'route-thinking',
        date: '2026-02-27',
        categoryKey: 'design',
        category: { en: 'Design', de: 'Design' },
        image: '/images/anton.webp',
        title: { en: 'Route Thinking', de: 'Routen-Denken' },
        excerpt: {
            en: 'Notes on keeping URLs useful even when the UI prefers popups and overlays.',
            de: 'Notizen dazu, URLs nützlich zu halten, auch wenn die UI Popups und Overlays bevorzugt.',
        },
        body: {
            en: [
                'A modal can be the primary reading experience while the dynamic route still exists as a stable address for a post.',
                'That keeps the interface fast without throwing away the routing structure underneath.',
            ],
            de: [
                'Ein Modal kann die primäre Leseerfahrung sein, während die dynamische Route weiterhin als stabile Adresse für den Beitrag existiert.',
                'So bleibt das Interface schnell, ohne die Routing-Struktur darunter aufzugeben.',
            ],
        },
    },
]

export function localizePost(
    post: BlogPost,
    locale: BlogLocale
): LocalizedBlogPost {
    return {
        slug: post.slug,
        date: post.date,
        categoryKey: post.categoryKey,
        category: post.category[locale],
        image: post.image,
        title: post.title[locale],
        excerpt: post.excerpt[locale],
        body: post.body[locale],
    }
}

export function getPost(slug: string) {
    return posts.find((post) => post.slug === slug)
}
