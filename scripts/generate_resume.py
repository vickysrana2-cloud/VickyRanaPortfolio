"""
Generate a pristine, professional 2-page PDF resume matching Vicky Rana's resume.
"""

def escape_pdf(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def generate_pdf():
    # Page 1 commands
    p1 = []
    
    # Header Banner Background
    p1.append("0.28 0.31 0.33 rg") # Dark slate header bar
    p1.append("0 720 595 122 re f")
    
    # Header Name
    p1.append("1 1 1 rg") # White text
    p1.append("BT /F2 24 Tf 36 805 Td (" + escape_pdf("VICKY RANA") + ") Tj ET")
    
    # Header Details (Two Columns)
    p1.append("BT /F1 9 Tf 36 780 Td (" + escape_pdf("Email: vickysrana2@gmail.com") + ") Tj ET")
    p1.append("BT /F1 9 Tf 36 765 Td (" + escape_pdf("Phone: 7218869971") + ") Tj ET")
    p1.append("BT /F1 9 Tf 36 750 Td (" + escape_pdf("Location: Nagpur, Maharashtra") + ") Tj ET")
    
    p1.append("BT /F1 9 Tf 360 780 Td (" + escape_pdf("Linkedin: vicky-rana-7457ab225") + ") Tj ET")
    p1.append("BT /F1 9 Tf 360 765 Td (" + escape_pdf("Github: vickysrana2-cloud") + ") Tj ET")
    p1.append("BT /F1 9 Tf 360 750 Td (" + escape_pdf("Portfolio: vicky-rana-portfolio") + ") Tj ET")
    
    y = 695
    p1.append("0 0 0 rg") # Black text
    
    # Objective
    p1.append("BT /F1 9.5 Tf 36 " + str(y) + " Td (" + escape_pdf("Aspiring Software Developer with hands-on experience building responsive and scalable web applications") + ") Tj ET")
    y -= 13
    p1.append("BT /F1 9.5 Tf 36 " + str(y) + " Td (" + escape_pdf("using React.js, Java, Spring Boot, and MySQL. Strong foundation in object-oriented programming, REST") + ") Tj ET")
    y -= 13
    p1.append("BT /F1 9.5 Tf 36 " + str(y) + " Td (" + escape_pdf("API integration, and frontend-backend development. Eager to contribute to real-world projects while") + ") Tj ET")
    y -= 13
    p1.append("BT /F1 9.5 Tf 36 " + str(y) + " Td (" + escape_pdf("continuously improving software development skills.") + ") Tj ET")
    
    # Section Header Helper
    def section_header(title, cur_y):
        cmds = []
        cur_y -= 22
        cmds.append("0.2 0.25 0.35 rg")
        cmds.append("BT /F2 11 Tf 36 " + str(cur_y) + " Td (" + escape_pdf(title) + ") Tj ET")
        cur_y -= 4
        cmds.append("0.7 0.7 0.7 RG 1 w 36 " + str(cur_y) + " m 559 " + str(cur_y) + " l S")
        cur_y -= 14
        cmds.append("0 0 0 rg")
        return cmds, cur_y
    
    # TECHNICAL SKILLS
    cmds, y = section_header("TECHNICAL SKILLS", y)
    p1.extend(cmds)
    
    skills = [
        ("Frontend: ", "Next.js, React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap"),
        ("Backend & APIs: ", "Java (8+), Spring Boot, RESTful APIs, JSON, NestJS"),
        ("Databases: ", "MongoDB, MongoDB Atlas, MySQL"),
        ("UI & Performance: ", "Responsive Web Design, Component-Based Architecture, API Integration, Performance Optimization, SEO fundamentals"),
        ("Tools: ", "Git, GitHub, Chrome DevTools")
    ]
    for cat, items in skills:
        p1.append("BT /F2 9 Tf 36 " + str(y) + " Td (" + escape_pdf(cat) + ") Tj /F1 9 Tf (" + escape_pdf(items) + ") Tj ET")
        y -= 13
        
    # PROJECT SUMMARY
    cmds, y = section_header("PROJECT SUMMARY", y)
    p1.extend(cmds)
    
    # Project 1: DesignMeInteriors
    p1.append("BT /F2 10 Tf 36 " + str(y) + " Td (" + escape_pdf("DesignMeInteriors | Live Demo") + ") Tj ET")
    y -= 12
    p1.append("BT /F2 8.5 Tf 36 " + str(y) + " Td (" + escape_pdf("Tech Stack: ") + ") Tj /F1 8.5 Tf (" + escape_pdf("Next.js, Tailwind CSS, Blogger API") + ") Tj ET")
    y -= 12
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Developed frontend sections for an interior-design website using a reference-driven layout and responsive styling.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Implemented UI motion and animations and integrated a mock API during development.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Applied responsive design and SEO-related improvements.") + ") Tj ET")
    y -= 15
    
    # Project 2: Pawsitive
    p1.append("BT /F2 10 Tf 36 " + str(y) + " Td (" + escape_pdf("Pawsitive - Pet Care Management Platform | GitHub") + ") Tj ET")
    y -= 12
    p1.append("BT /F2 8.5 Tf 36 " + str(y) + " Td (" + escape_pdf("Tech Stack: ") + ") Tj /F1 8.5 Tf (" + escape_pdf("React.js, JavaScript, Spring Boot, REST APIs, MySQL, JWT, Tailwind CSS, Git, GitHub") + ") Tj ET")
    y -= 12
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Developed responsive UI components using React.js and Tailwind CSS for managing user and pet data.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Integrated REST APIs and handled client-side state for dynamic data rendering.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Implemented role-based UI access and ensured consistent, user-friendly experience across devices.") + ") Tj ET")
    y -= 15
    
    # Project 3: Archinet
    p1.append("BT /F2 10 Tf 36 " + str(y) + " Td (" + escape_pdf("Archinet - Design & Architecture Website | Live Demo") + ") Tj ET")
    y -= 12
    p1.append("BT /F2 8.5 Tf 36 " + str(y) + " Td (" + escape_pdf("Tech Stack: ") + ") Tj /F1 8.5 Tf (" + escape_pdf("Next.js, Tailwind CSS, GitHub") + ") Tj ET")
    y -= 12
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Developed the Archinet website from scratch, implementing the frontend and overall user interface.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Built responsive layouts and interactive UI components to deliver a consistent experience across devices.") + ") Tj ET")
    y -= 11
    p1.append("BT /F1 8.5 Tf 46 " + str(y) + " Td (" + escape_pdf("- Focused on clean design, usability, and structured frontend implementation.") + ") Tj ET")
    y -= 15
    
    # EDUCATION & TRAINING (on Page 1)
    cmds, y = section_header("EDUCATION & TRAINING", y)
    p1.extend(cmds)
    
    edu = [
        "- Full Stack Web Development | IT Vedant | Feb 2026",
        "- Bachelor of Technology | Mechanical Engineering | RTMNU University | 2024",
        "- Diploma (Polytechnic) | Mechanical Engineering | MSBTE Board | 2021",
        "- 12th | Computer Science | HSC Board | 2019",
        "- 10th | SSC Board | 2017"
    ]
    for e in edu:
        p1.append("BT /F1 8.5 Tf 36 " + str(y) + " Td (" + escape_pdf(e) + ") Tj ET")
        y -= 12

    # PAGE 2 COMMANDS
    p2 = []
    y2 = 790
    
    # Header mini
    p2.append("0.28 0.31 0.33 rg")
    p2.append("0 812 595 30 re f")
    p2.append("1 1 1 rg")
    p2.append("BT /F2 12 Tf 36 822 Td (" + escape_pdf("VICKY RANA - CURRICULUM VITAE (PAGE 2)") + ") Tj ET")
    p2.append("0 0 0 rg")
    
    # WORK EXPERIENCE
    cmds, y2 = section_header("WORK EXPERIENCE", y2)
    p2.extend(cmds)
    
    # Exp 1: Actifyzone
    p2.append("BT /F2 10 Tf 36 " + str(y2) + " Td (" + escape_pdf("Frontend Developer Intern | Actifyzone | Aug 2026 - Present") + ") Tj ET")
    y2 -= 13
    p2.append("BT /F1 9 Tf 46 " + str(y2) + " Td (" + escape_pdf("- Contributing to frontend development across multiple web projects.") + ") Tj ET")
    y2 -= 12
    p2.append("BT /F1 9 Tf 46 " + str(y2) + " Td (" + escape_pdf("- Working on responsive interfaces and UI implementation; specific project-level contributions can be added as") + ") Tj ET")
    y2 -= 11
    p2.append("BT /F1 9 Tf 53 " + str(y2) + " Td (" + escape_pdf("details are confirmed.") + ") Tj ET")
    y2 -= 18
    
    # Exp 2: Havet AI
    p2.append("BT /F2 10 Tf 36 " + str(y2) + " Td (" + escape_pdf("Full Stack Developer Intern | Havet AI | 3-month internship") + ") Tj ET")
    y2 -= 13
    p2.append("BT /F1 9 Tf 46 " + str(y2) + " Td (" + escape_pdf("- Contributed to full-stack web development using Next.js, NestJS, and MongoDB Atlas, implementing UI") + ") Tj ET")
    y2 -= 11
    p2.append("BT /F1 9 Tf 53 " + str(y2) + " Td (" + escape_pdf("components, REST API integration, and backend functionality.") + ") Tj ET")
    y2 -= 12
    p2.append("BT /F1 9 Tf 46 " + str(y2) + " Td (" + escape_pdf("- Worked with a Next.js frontend and supported UI implementation and integration tasks.") + ") Tj ET")
    y2 -= 20
    
    # CERTIFICATIONS
    cmds, y2 = section_header("CERTIFICATIONS", y2)
    p2.extend(cmds)
    
    certs = [
        "- Java Full Stack Web Development Essentials | IT Vedant | View",
        "- Hackathon Winner - WeatherWatch Project | IT Vedant | Silver Medal | Team Leader | View",
        "- Certificate Of Accomplishment | JavaScript Basics | HackerRank | View"
    ]
    for c in certs:
        p2.append("BT /F1 9 Tf 46 " + str(y2) + " Td (" + escape_pdf(c) + ") Tj ET")
        y2 -= 14
        
    y2 -= 10
    
    # PERSONAL DETAILS
    cmds, y2 = section_header("PERSONAL DETAILS", y2)
    p2.extend(cmds)
    
    p2.append("BT /F2 9 Tf 36 " + str(y2) + " Td (" + escape_pdf("Date of Birth") + ") Tj /F1 9 Tf 90 0 Td (" + escape_pdf(":  12 Feb 2001") + ") Tj ET")
    y2 -= 14
    p2.append("BT /F2 9 Tf 36 " + str(y2) + " Td (" + escape_pdf("Languages") + ") Tj /F1 9 Tf 90 0 Td (" + escape_pdf(":  English, Hindi, Marathi") + ") Tj ET")
    y2 -= 14
    p2.append("BT /F2 9 Tf 36 " + str(y2) + " Td (" + escape_pdf("Address") + ") Tj /F1 9 Tf 90 0 Td (" + escape_pdf(":  Nagpur, Maharashtra") + ") Tj ET")
    
    stream1 = "\n".join(p1).encode('latin-1')
    stream2 = "\n".join(p2).encode('latin-1')
    
    # Assemble PDF with cross-reference table
    objects = []
    
    # obj 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # obj 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>")
    # obj 3: Page 1
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>")
    # obj 4: Page 2
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>")
    # obj 5: Stream 1
    objects.append(b"<< /Length " + str(len(stream1)).encode('ascii') + b" >>\nstream\n" + stream1 + b"\nendstream")
    # obj 6: Stream 2
    objects.append(b"<< /Length " + str(len(stream2)).encode('ascii') + b" >>\nstream\n" + stream2 + b"\nendstream")
    # obj 7: Font F1 (Helvetica)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # obj 8: Font F2 (Helvetica-Bold)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    
    output = bytearray(b"%PDF-1.4\n")
    offsets = []
    for i, obj in enumerate(objects, 1):
        offsets.append(len(output))
        output.extend(f"{i} 0 obj\n".encode('ascii'))
        output.extend(obj)
        output.extend(b"\nendobj\n")
        
    xref_offset = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode('ascii'))
    output.extend(b"0000000000 65535 f \n")
    for off in offsets:
        output.extend(f"{off:010d} 00000 n \n".encode('ascii'))
        
    output.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode('ascii'))
    output.extend(f"startxref\n{xref_offset}\n%%EOF\n".encode('ascii'))
    
    with open("public/resume.pdf", "wb") as f:
        f.write(output)
        
    print(f"Successfully generated public/resume.pdf ({len(output)} bytes)")

if __name__ == '__main__':
    generate_pdf()
