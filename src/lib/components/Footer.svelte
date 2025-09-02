<script lang="ts">
    const currentYear = new Date().getFullYear()
</script>

<footer
    class="
    /* Minimal theme (default) */
    bg-transparent border-t border-neutral-300 py-8
    
    /* Artistic theme overrides */
    artistic:bg-bg-secondary artistic:border-t artistic:border-neutral-200 artistic:shadow-inner
"
>
    <div class="max-w-5xl mx-auto px-4">
        <div
            class="
            /* Minimal theme (default) */
            flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0
            
            /* Artistic theme overrides */
            artistic:flex-row artistic:space-y-0
        "
        >
            <!-- Copyright -->
            <div
                class="
                /* Minimal theme (default) */
                text-sm font-light text-text-secondary
                
                /* Artistic theme overrides */
                artistic:font-normal
            "
            >
                © {currentYear} Anton Lechuga.
            </div>

            <!-- Social Links -->
            <div
                class="
                /* Minimal theme (default) */
                flex space-x-6
                
                /* Artistic theme overrides */
                artistic:space-x-6
            "
            >
                <!-- Strava -->
                <a
                    href="https://www.strava.com/athletes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                    /* Minimal theme (default) */
                    text-text-secondary hover:text-text-primary transition-colors duration-300
        
                    /* Artistic theme overrides */
                    artistic:text-text-secondary artistic:hover:text-primary
                    "
                    aria-label="Strava"
                >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="m15.387 18.354-3.956-7.958h-1.92l5.875 11.825L22 10.396h-1.92l-4.693 7.958zM8.575 10.396 4.138 19.526h-1.92l6.357-13.063L15.387 18.354h-1.92L8.575 10.396z"
                        />
                    </svg>
                </a>

                <!-- Gmail -->
                <a
                    href="mailto:anton.lechuga@gmail.com"
                    class="
                        /* Minimal theme (default) */
                        text-text-secondary hover:text-text-primary transition-colors duration-300
                        
                        /* Artistic theme overrides */
                        artistic:text-text-secondary artistic:hover:text-primary
                    "
                    aria-label="Email"
                >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.682L12 12.5l9.682-8.679h.682c.904 0 1.636.732 1.636 1.636z"
                        />
                    </svg>
                </a>

                <!-- GitHub -->
                <a
                    href="https://github.com/ant-le"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        /* Minimal theme (default) */
                        text-text-secondary hover:text-text-primary transition-colors duration-300
                        
                        /* Artistic theme overrides */
                        artistic:text-text-secondary artistic:hover:text-primary
                    "
                    aria-label="GitHub"
                >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</footer>
