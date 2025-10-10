<script>
    import { base } from '$app/paths';
    import { Menu as MenuIcon, ChevronDown, ChevronUp, Sun, Moon, ExternalLink } from "@lucide/svelte";
    import { setMode } from "mode-watcher";
    import Menu from "./Nav.Menu.svelte";
    
    let isMenuOpen = $state(false);
	  let menuButtonRef;
	  let isScrolled = $state(false);
	  let isWhoWeAreOpen = $state(false);
	  let isResearchOpen = $state(false);
	  let isEducationOpen = $state(false);
    let isDark = $state(false);

    function handleScroll() {
        isScrolled = window.scrollY > 0;
    }
    
    function closeMenu(skipFocus = false) {
      isMenuOpen = false;
      if (!skipFocus) menuButtonRef?.focus();
    }
    
    function closeDropdowns() {
      isWhoWeAreOpen = false;
      isResearchOpen = false;
      isEducationOpen = false;
    }
    
    function handleClickOutside(event) {
      if (!event.target.closest('.nav-dropdown')) {
        closeDropdowns();
      }
    }

    function toggleTheme() {
      isDark = !isDark;
      setMode(isDark ? 'dark' : 'light');
    }

    $effect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', handleScroll);
          window.addEventListener('click', handleClickOutside);
          
          // Set initial theme state
          isDark = document.documentElement.classList.contains('dark');
          
          return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClickOutside);
          };
        }
      });
  
    </script>

<header class="header" class:scrolled={isScrolled}>
	<div class="header-left">
		<a href="{base}/" class="vsci-logo-container">
			<img src="{base}/vcsi-bumper-sticker-horizontal.jpg" alt="Home" class="vcsi-logo" />
		</a>

		<nav class="desktop-nav">
		<div class="nav-dropdown">
			<button 
				onclick={() => {
					isResearchOpen = false;
					isEducationOpen = false;
					isWhoWeAreOpen = !isWhoWeAreOpen;
				}}
				class="nav-button"
			>
				Community
				{#if isWhoWeAreOpen}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</button>
			
			{#if isWhoWeAreOpen}
				<div class="dropdown-menu">
					<a href="{base}/who-we-are" class="dropdown-item" onclick={() => closeDropdowns()}>Who We Are</a>
					<a href="{base}/community/paper-shredder" class="dropdown-item" onclick={() => closeDropdowns()}>Paper Shredder</a>
					<a href="{base}/community/scraps" class="dropdown-item" onclick={() => closeDropdowns()}>SCRaPS</a>
					<a href="{base}/community/talkboctopus" class="dropdown-item" onclick={() => closeDropdowns()}>Talkboctopus</a>
					<a href="{base}/community/credits" class="dropdown-item" onclick={() => closeDropdowns()}>Credits</a>
				</div>
			{/if}
		</div>
		
		<div class="nav-dropdown">
			<button 
				onclick={() => {
					isWhoWeAreOpen = false;
					isEducationOpen = false;
					isResearchOpen = !isResearchOpen;
				}}
				class="nav-button"
			>
				Research
				{#if isResearchOpen}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</button>
			
			{#if isResearchOpen}
				<div class="dropdown-menu">
					<a href="{base}/projects" class="dropdown-item" onclick={() => closeDropdowns()}>Projects</a>
					<a href="{base}/research/group" class="dropdown-item" onclick={() => closeDropdowns()}>Groups</a>
					<a href="{base}/funding" class="dropdown-item" onclick={() => closeDropdowns()}>Funding</a>
					<a 
            href="https://verso.w3.uvm.edu/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="dropdown-item" 
            onclick={() => closeDropdowns()}>
              VERSO
              <ExternalLink size={12} />
					</a>
					<a 
            href="https://www.nature.com/npjcomplex/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="dropdown-item" 
            onclick={() => closeDropdowns()}>
              npj Complexity
              <ExternalLink size={12} />
					</a>
					<a href="{base}/research/mass-mutual" class="dropdown-item" onclick={() => closeDropdowns()}>Mass Mutual Center of Excellence</a>
				</div>
			{/if}
		</div>
		
		<div class="nav-dropdown">
			<button 
				onclick={() => {
					isWhoWeAreOpen = false;
					isResearchOpen = false;
					isEducationOpen = !isEducationOpen;
				}}
				class="nav-button"
			>
				Education
				{#if isEducationOpen}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</button>
			
			{#if isEducationOpen}
				<div class="dropdown-menu">
					<a href="{base}/education/undergraduate" class="dropdown-item" onclick={() => closeDropdowns()}>Undergraduate</a>
					<a href="{base}/education/masters" class="dropdown-item" onclick={() => closeDropdowns()}>Masters</a>
					<a href="{base}/education/certificate" class="dropdown-item" onclick={() => closeDropdowns()}>Certificate</a>
					<a href="{base}/education/phd" class="dropdown-item" onclick={() => closeDropdowns()}>PhD</a>
				</div>
			{/if}
			</div>
		
    <a 
      href="{base}/events"
      class="nav-link"
    >
      Events
    </a>
    <a 
      href="https://complex-stories.uvm.edu/"
      target="_blank"
      rel="noopener noreferrer"
      class="nav-link"
    >
      Complex Stories
      <ExternalLink size={14} />
    </a>
		</nav>
	</div>

	<div class="header-right">
		<button 
			onclick={toggleTheme}
			class="theme-toggle"
			title="Toggle theme"
		>
			{#if isDark}
				<Sun size={20} />
			{:else}
				<Moon size={20} />
			{/if}
		</button>

		<button 
			onclick={() => isMenuOpen = !isMenuOpen}
			bind:this={menuButtonRef}
			class="menu-button"
		>
			<MenuIcon class="icon" size={28} />
			<span class="sr-only">Open menu</span>
		</button>
	</div>

</header>

<Menu visible={isMenuOpen} close={closeMenu} />

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    margin: 0;
    padding: 0.8rem var(--margin-left) 0.5rem var(--margin-left);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--color-bg);
    border-bottom: 2px solid transparent;
    z-index: 100;
    width: 100%;
    transition: border-bottom-color 200ms ease;
    box-sizing: border-box;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .vcsi-logo {
    border-radius: var(--border-radius);
    max-height: 2.3rem;
    object-fit: contain;
    mix-blend-mode: multiply;
  }
  
  /* Show border when scrolled */
  .header.scrolled {
    border-bottom-color: var(--color-gray-400);
  }

  /* Desktop navigation */
  .desktop-nav {
    display: flex;
    align-items: center;
  }
  
  .nav-dropdown {
    position: relative;
  }
  
  .nav-button {
    background: transparent;
    border: none;
    color: var(--color-fg);
    font-family: var(--serif);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: color 200ms ease;
  }
  
  .nav-button:hover {
    color: var(--color-gray-600);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: whitesmoke;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 0.5rem 0;
    min-width: 18rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    color: var(--color-fg);
    text-decoration: none;
    font-family: var(--serif);
    transition: background-color 200ms ease;
  }
  
  .dropdown-item:hover {
    background: var(--color-gray-300);
  }

  .nav-link {
    background: transparent;
    border: none;
    color: var(--color-fg);
    font-family: var(--serif);
    font-size: 1rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: color 200ms ease;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .nav-link:hover {
    color: var(--color-gray-600);
  }

  /* Theme toggle - hidden but functional */
  .theme-toggle {
    background: transparent;
    border: none;
    color: transparent;
    cursor: zoom-in;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    transition: background-color 200ms ease, color 200ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  /* Change cursor based on theme */
  :global(.dark) .theme-toggle {
    cursor: zoom-out;
  }

  .theme-toggle:hover {
    opacity: 0.3;
    color: var(--color-fg);
  }

  /* Hide menu button on desktop */
  .menu-button {
    display: none;
  }
  
  /* Dark mode background */
  :global(.dark) .header {
    background: var(--color-bg);
  }
  
  :global(.dark) .nav-button {
		color: var(--color-gray-800);
	}

  :global(.dark) .theme-toggle:hover {
    background: var(--color-gray-300);
  }
	
  

  /* Mobile layout */
  @media (max-width: 768px) {
    /* Only logo and hamburger menu, each in their corner */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      justify-content: space-between;
      margin: 0;
      padding: 1rem;
      z-index: 100;
    }

    .header-left {
      gap: 0;
    }
    
    .menu-button {
      display: flex;
    }

    .theme-toggle {
      display: none;
    }
    
    .desktop-nav {
      display: none;
    }
  }

  .vsci-logo-container {
    background: transparent;
    color: var(--color-fg);
    text-decoration: none;
    cursor: pointer;
  }

  .menu-button {
    background: transparent;
    color: var(--color-fg);
    border: none;
    cursor: pointer;
  }


  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

</style>