<a href="octopus_icon"><img src="static/favicon.jpg?raw=true)" width="180" align="Right" /></a>


# Vermont Complex Systems Institute Website

<div align="center">

**A hub for interdisciplinary research, education, and community in complex systems**

[Visit Website](https://vermontcomplexsystems.org) • [Research Groups](https://vermontcomplexsystems.org/research/group) • [Who We Are](https://vermontcomplexsystems.org/who-we-are)

</div>

---

## 🎯 About

The Vermont Complex Systems Institute (VCSI) website serves as the digital home for our research community, showcasing:

- **Research Excellence**: Faculty, students, and collaborative research groups exploring complex systems
- **Educational Programs**: PhD, Master's, Certificate, and undergraduate programs in complex systems
- **Research Metrics**: Integrated publication data and impact metrics via OpenAlex
- **Course Integration**: Live course data from UVM's Schedule of Classes
- **Community Projects**: Featured projects from Storywrangler to Xenobots

Built with modern web technologies, this site automatically integrates research metrics, generates profile pages, and provides a dynamic view into our community's work.

## 🎨 Features

- **📚 Dynamic Member Profiles** - Automatically generated pages with integrated research metrics from OpenAlex
- **🔬 Research Groups** - Showcase collaborative research teams and their work
- **📊 Live Course Data** - Real-time integration with UVM's Schedule of Classes
- **📈 Research Metrics** - H-index, citation counts, and publication tracking
- **🎓 Educational Programs** - Information about PhD, Master's, Certificate, and undergraduate programs
- **🚀 Featured Projects** - Showcase of major research initiatives and their publications
- **⚡ Static Site** - Fast, secure, and easy to deploy

## 📊 Data Management

### Adding Team Members

Contributing new members is easy and automatically generates profile pages:

1. **Edit** `src/data/members.csv` with member information
2. **Include** [OpenAlex](https://openalex.org/) ID (format: `A1234567890`) for automatic research metrics (if available)
3. **Add** member photo to `static/common/assets/members/[member-id].jpg`. It is important that the filename correspond to the member `id` provided in `member.csv`, e.g. `jso` ➜ `jso.jpg`.
4. **Commit** - The site automatically generates a profile page at build time

### Adding Research Groups

1. **Edit** `src/data/groups.csv` with group information
3. **Add** group logo to `static/common/assets/groups/[group-id].jpg`
2. **Commit** - A group page is automatically generated

### Updating Research Metrics

The site automatically integrates research data from OpenAlex for members who have an OpenAlex ID in their profile. To update metrics:

1. Ensure members have OpenAlex IDs in `members.csv`
2. Run the data population script (requires database setup - see [CLAUDE.md](CLAUDE.md) for technical details)
3. Build the site to regenerate profile pages

### Adding Project Publications

Project-specific publication lists are maintained in `src/data/publications/*.csv`. Each CSV contains DOIs that are automatically enriched with metadata from OpenAlex.

## 🤝 Contributing

We welcome contributions from the VCSI community! Whether you're a faculty member, student, or staff, you can help keep this site current and comprehensive.

### Ways to Contribute

- **👥 Add/Update Members** - Keep our team roster current by editing [`members.csv`](src/data/members.csv)
- **🔬 Add Research Groups** - Showcase new collaborative groups in [`groups.csv`](src/data/groups.csv)
- **📝 Update Projects** - Add or update project information in [`projects.csv`](src/data/projects.csv)
- **📚 Update Publications** - Maintain project publication lists in [`publications/`](src/data/publications/)
- **🐛 Report Issues** - Found a bug? [Open an issue](https://github.com/Vermont-Complex-Systems/vcsi-website/issues)
- **💡 Suggest Features** - Ideas for improving the site? Start a discussion!

### Easy Contribution (No Technical Setup Required)

For simple content updates (CSV files):

1. Navigate to the file on GitHub (e.g., [`src/data/members.csv`](src/data/members.csv))
2. Click the ✏️ **Edit** icon
3. Make your changes
4. Scroll down and click **Propose changes**
5. Create a pull request with your changes

### Technical Contributions

For developers working on features or bug fixes, see [CLAUDE.md](CLAUDE.md) for complete development setup, architecture details, and technical documentation.

## 📄 License

This project is maintained by the Vermont Complex Systems Institute at the University of Vermont.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/) and [Svelte 5](https://svelte.dev/)
- Research metrics powered by [OpenAlex](https://openalex.org/)
- Course data from [UVM Schedule of Classes](https://www.uvm.edu/registrar/schedule-of-classes)
- Inspired by open science and reproducible research practices

---

<div align="center">

**Vermont Complex Systems Institute**

*Advancing the study of complex systems through research, education, and community*

[Website](https://vermontcomplexsystems.org) • [GitHub](https://github.com/Vermont-Complex-Systems)

</div>

