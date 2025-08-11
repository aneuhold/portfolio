<script lang="ts">
  import { marked } from 'marked';
  import stripFrontMatter from 'src/util/stripFrontMatter';

  /**
   * The type of data that is returned from `import.meta.globEager` for blog
   * posts.
   */
  type PostsData = {
    [filePath: string]: {
      metadata: { title: string; date: Date };
    };
  };

  /**
   * The data that is held in a Post object.
   */
  type Post = {
    title: string;
    date: Date;
    html: string;
  };

  const postsData: PostsData = import.meta.glob('../posts/*.md', { eager: true });
  const postsRawStrings: { [filePath: string]: string } = import.meta.glob('../posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });

  const posts: Post[] = Object.entries(postsData).map(([filePath, postData]) => {
    return {
      title: postData.metadata.title,
      date: postData.metadata.date,
      html: marked.parse(stripFrontMatter(postsRawStrings[filePath]), { async: false }) as string
    };
  });
</script>

{#each posts as post}
  <p>{@html post.html}</p>
{/each}
