<script>
  import { Youtube, Linkedin } from "@lucide/svelte";

  let { author, semanticScholarUrl } = $props();
</script>

<div class="profile-links">
  {#if author.linkedin}
    <a href={author.linkedin} target="_blank" rel="noopener" title="LinkedIn" class="profile-icon">
      <Linkedin size={20} />
    </a>
  {/if}
  {#if author.bluesky}
    <a href={author.bluesky} target="_blank" rel="noopener" title="Bluesky" aria-label="Bluesky" class="profile-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
      </svg>
    </a>
  {/if}
  {#if author.youtube}
    <a href={author.youtube} target="_blank" rel="noopener" title="YouTube" class="profile-icon">
      <Youtube size={20} />
    </a>
  {/if}
  {#if author.openAlexId}
    <a href="https://openalex.org/authors/{author.openAlexId}" target="_blank" rel="noopener" title="OpenAlex" class="profile-icon">
      <img src="/common/assets/logos/openalex.svg" alt="OpenAlex" width="20" height="20" />
    </a>
  {/if}
  {#if author.GoogleScholar}
    <a href={author.GoogleScholar} target="_blank" rel="noopener" title="Google Scholar" class="profile-icon">
      <img src="/common/assets/logos/google-scholar.svg" alt="Google Scholar" width="20" height="20" />
    </a>
  {/if}
  {#if semanticScholarUrl}
    <a href={semanticScholarUrl} target="_blank" rel="noopener" title="Semantic Scholar" class="profile-icon">
      <img src="/common/assets/logos/semantic-scholar.png" alt="Semantic Scholar" width="20" height="20" />
    </a>
  {/if}
</div>

<style>
  .profile-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: -1.25rem;
    margin-bottom: 1.25rem;
  }

  .profile-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-600);
    text-decoration: none;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--color-gray-300);
    border-radius: 50%;
    transition: all 150ms ease;
  }

  .profile-icon:hover {
    color: var(--color-fg);
    border-color: var(--color-fg);
  }

  .profile-icon img {
    border-radius: 0;
  }
</style>
