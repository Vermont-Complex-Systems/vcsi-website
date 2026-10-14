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
- **📈 Research Metrics** - H-index, citation counts, and publication tracking
- **🎓 Educational Programs** - Information about PhD, Master's, Certificate, and undergraduate programs
- **🚀 Featured Projects** - Showcase of major research initiatives and their publications
- **⚡ Static Site** - Fast, secure, and easy to deploy

## 🤝 Contributing

To modify information about people, projects, or publications, visit the `VCSI-web` sharepoint site. Faculty wondering where their lab's people and papers come from: see [docs/for-faculty.md](docs/for-faculty.md).

After editing the workbook, `npm run data:check` lists anything the site can't use (unknown group ids, duplicate rows, shifted columns, typos in ids), with the sheet and row to fix. The same report appears on each GitHub Actions run summary.

`npm run people:audit` compares group websites with the people sheets and suggests updates; see [scripts/people-audit/README.md](scripts/people-audit/README.md).


## 📄 License

This project is maintained by the Vermont Complex Systems Institute at the University of Vermont.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/) and [Svelte 5](https://svelte.dev/)
- Research metrics powered by [OpenAlex](https://openalex.org/)

---

<div align="center">

**Vermont Complex Systems Institute**

*Advancing the study of complex systems through research, education, and community*

[Website](https://vermontcomplexsystems.org) • [GitHub](https://github.com/Vermont-Complex-Systems)

</div>

