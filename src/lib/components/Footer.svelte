<script lang="ts">
    const buildDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
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
            <!-- Build Info -->
            <div
                class="
                /* Minimal theme (default) */
                text-sm font-light text-text-secondary
                
                /* Artistic theme overrides */
                artistic:font-normal
            "
            >
                Last updated: {buildDate}
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
                    href="https://www.strava.com/athletes/antonlechuga"
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
                    <svg class="w-5 h-5" viewBox="0 0 192 192" fill="none">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="12"
                            d="m41 106 42-84 42 84m-26 12 26 52 26-52"
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

                <!-- SoundCloud -->
                <a
                    href="https://soundcloud.com/antonlechuga"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        /* Minimal theme (default) */
                        text-text-secondary hover:text-text-primary transition-colors duration-300
                        
                        /* Artistic theme overrides */
                        artistic:text-text-secondary artistic:hover:text-primary
                    "
                    aria-label="SoundCloud"
                >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="-271 345.8 256 111.2"
                    >
                        <path
                            d="M-238.4,398.1c-0.8,0-1.4,0.6-1.5,1.5l-2.3,28l2.3,27.1c0.1,0.8,0.7,1.5,1.5,1.5c0.8,0,1.4-0.6,1.5-1.5l2.6-27.1l-2.6-28 C-237,398.7-237.7,398.1-238.4,398.1z"
                        ></path>
                        <path
                            d="M-228.2,399.9c-0.9,0-1.7,0.7-1.7,1.7l-2.1,26l2.1,27.3c0.1,1,0.8,1.7,1.7,1.7c0.9,0,1.6-0.7,1.7-1.7l2.4-27.3l-2.4-26 C-226.6,400.6-227.3,399.9-228.2,399.9z"
                        ></path>
                        <path
                            d="M-258.6,403.5c-0.5,0-1,0.4-1.1,1l-2.5,23l2.5,22.5c0.1,0.6,0.5,1,1.1,1c0.5,0,1-0.4,1.1-1l2.9-22.5l-2.9-23 C-257.7,404-258.1,403.5-258.6,403.5z"
                        ></path>
                        <path
                            d="M-268.1,412.3c-0.5,0-1,0.4-1,1l-1.9,14.3l1.9,14c0.1,0.6,0.5,1,1,1s0.9-0.4,1-1l2.2-14l-2.2-14.2 C-267.2,412.8-267.6,412.3-268.1,412.3z"
                        ></path>
                        <path
                            d="M-207.5,373.5c-1.2,0-2.1,0.9-2.2,2.1l-1.9,52l1.9,27.2c0.1,1.2,1,2.1,2.2,2.1s2.1-0.9,2.2-2.1l2.1-27.2l-2.1-52 C-205.4,374.4-206.4,373.5-207.5,373.5z"
                        ></path>
                        <path
                            d="M-248.6,399c-0.7,0-1.2,0.5-1.3,1.3l-2.4,27.3l2.4,26.3c0.1,0.7,0.6,1.3,1.3,1.3c0.7,0,1.2-0.5,1.3-1.2l2.7-26.3l-2.7-27.3 C-247.4,399.6-247.9,399-248.6,399z"
                        ></path>
                        <path
                            d="M-217.9,383.4c-1,0-1.9,0.8-1.9,1.9l-2,42.3l2,27.3c0.1,1.1,0.9,1.9,1.9,1.9s1.9-0.8,1.9-1.9l2.3-27.3l-2.3-42.3 C-216,384.2-216.9,383.4-217.9,383.4z"
                        ></path>
                        <path
                            d="M-154.4,359.3c-1.8,0-3.2,1.4-3.2,3.2l-1.2,65l1.2,26.1c0,1.8,1.5,3.2,3.2,3.2c1.8,0,3.2-1.5,3.2-3.2l1.4-26.1l-1.4-65 C-151.1,360.8-152.6,359.3-154.4,359.3z"
                        ></path>
                        <path
                            d="M-197.1,368.9c-1.3,0-2.3,1-2.4,2.4l-1.8,56.3l1.8,26.9c0,1.3,1.1,2.3,2.4,2.3s2.3-1,2.4-2.4l2-26.9l-2-56.3 C-194.7,370-195.8,368.9-197.1,368.9z"
                        ></path>
                        <path
                            d="M-46.5,394c-4.3,0-8.4,0.9-12.2,2.4C-61.2,368-85,345.8-114,345.8c-7.1,0-14,1.4-20.1,3.8c-2.4,0.9-3,1.9-3,3.7v99.9 c0,1.9,1.5,3.5,3.4,3.7c0.1,0,86.7,0,87.3,0c17.4,0,31.5-14.1,31.5-31.5C-15,408.1-29.1,394-46.5,394z"
                        ></path>
                        <path
                            d="M-143.6,353.2c-1.9,0-3.4,1.6-3.5,3.5l-1.4,70.9l1.4,25.7c0,1.9,1.6,3.4,3.5,3.4c1.9,0,3.4-1.6,3.5-3.5l1.5-25.8l-1.5-70.9 C-140.2,354.8-141.7,353.2-143.6,353.2z"
                        ></path>
                        <path
                            d="M-186.5,366.8c-1.4,0-2.5,1.1-2.6,2.6l-1.6,58.2l1.6,26.7c0,1.4,1.2,2.6,2.6,2.6s2.5-1.1,2.6-2.6l1.8-26.7l-1.8-58.2 C-184,367.9-185.1,366.8-186.5,366.8z"
                        ></path>
                        <path
                            d="M-175.9,368.1c-1.5,0-2.8,1.2-2.8,2.8l-1.5,56.7l1.5,26.5c0,1.6,1.3,2.8,2.8,2.8s2.8-1.2,2.8-2.8l1.7-26.5l-1.7-56.7 C-173.1,369.3-174.3,368.1-175.9,368.1z"
                        ></path>
                        <path
                            d="M-165.2,369.9c-1.7,0-3,1.3-3,3l-1.4,54.7l1.4,26.3c0,1.7,1.4,3,3,3c1.7,0,3-1.3,3-3l1.5-26.3l-1.5-54.7 C-162.2,371.3-163.5,369.9-165.2,369.9z"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</footer>
