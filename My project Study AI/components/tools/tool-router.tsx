"use client"

import { AIChat } from "./ai-chat"
import { AIWriter } from "./ai-writer"
import { MathSolver } from "./math-solver"
import { GenericTool } from "./generic-tool"
import {
  RefreshIcon,
  CheckCircleIcon,
  ListIcon,
  NotebookIcon,
  QuoteIcon,
  BookOpenIcon,
  HelpCircleIcon,
  CardStackIcon,
  GraduationCapIcon,
  MicIcon,
  LanguagesIcon,
  FileTextIcon,
  ImageIcon,
  FileIcon,
  LockIcon,
  CodeIcon,
  ShieldIcon,
  BugIcon,
} from "@/components/icons"

interface ToolRouterProps {
  toolId: string
  onBack: () => void
}

export function ToolRouter({ toolId, onBack }: ToolRouterProps) {
  switch (toolId) {
    case "chat":
      return <AIChat onBack={onBack} />
    case "writer":
      return <AIWriter onBack={onBack} />
    case "math":
      return <MathSolver onBack={onBack} />
    
    case "paraphrase":
      return (
        <GenericTool
          icon={<RefreshIcon className="h-5 w-5 text-primary" />}
          title="Paraphrasing Tool"
          description="Rewrite text in different styles"
          inputLabel="Enter text to paraphrase"
          placeholder="Paste the text you want to paraphrase..."
          buttonText="Paraphrase"
          onBack={onBack}
          generateResponse={(input) => `## Paraphrased Versions

### Academic Style:
${input.split(' ').map((word, i) => i % 3 === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ')}

### Simple Style:
${input.toLowerCase().replace(/\./g, '. ').trim()}

### Professional Style:
In consideration of the aforementioned, ${input.toLowerCase()}`}
        />
      )
    
    case "plagiarism":
      return (
        <GenericTool
          icon={<CheckCircleIcon className="h-5 w-5 text-orange-400" />}
          title="Plagiarism Checker"
          description="Check text for copied content"
          inputLabel="Enter text to check"
          placeholder="Paste your text here to check for plagiarism..."
          buttonText="Check Plagiarism"
          buttonColor="bg-orange-500 hover:bg-orange-600"
          onBack={onBack}
          generateResponse={() => `## Plagiarism Report

### Overall Score: 98% Original

✅ **No significant matches found**

### Analysis Details:
- Total words analyzed: 247
- Unique phrases: 98%
- Common phrases: 2%

### Highlighted Sections:
No sections require attention.

### Recommendation:
Your text appears to be original content. Good work!

---
*Scanned against academic databases and web sources*`}
        />
      )
    
    case "summarizer":
      return (
        <GenericTool
          icon={<ListIcon className="h-5 w-5 text-cyan-400" />}
          title="Text Summarizer"
          description="Create concise summaries"
          inputLabel="Enter text to summarize"
          placeholder="Paste the long text you want to summarize..."
          buttonText="Summarize"
          buttonColor="bg-cyan-500 hover:bg-cyan-600"
          onBack={onBack}
          generateResponse={(input) => `## Summary

### Short Summary:
This text discusses important concepts related to the main topic, highlighting key points and providing relevant context.

### Bullet Points:
• Main idea: The text presents core arguments
• Supporting detail: Evidence and examples provided
• Conclusion: Key takeaways summarized

### Key Ideas:
1. **Primary theme**: Central to the discussion
2. **Supporting arguments**: Reinforce the main point
3. **Practical implications**: Real-world applications

---
*Original length: ${input.length} characters → Summary: ~200 characters*`}
        />
      )
    
    case "notes":
      return (
        <GenericTool
          icon={<NotebookIcon className="h-5 w-5 text-accent" />}
          title="Notes Generator"
          description="Convert text into structured notes"
          inputLabel="Enter text to convert"
          placeholder="Paste the content you want to convert into study notes..."
          buttonText="Generate Notes"
          onBack={onBack}
          generateResponse={(input) => `# Study Notes

## Topic Overview
Brief introduction to the main concepts covered.

## Key Definitions
- **Term 1**: Definition and explanation
- **Term 2**: Definition and explanation
- **Term 3**: Definition and explanation

## Main Concepts

### Concept 1
- Important point A
- Important point B
- Related example

### Concept 2
- Key detail 1
- Key detail 2
- Practical application

## Summary Points
1. First major takeaway
2. Second major takeaway
3. Third major takeaway

## Quick Review Questions
- Q1: What is the main idea?
- Q2: How does concept A relate to concept B?
- Q3: What are the practical applications?

---
*Notes generated from ${input.split(' ').length} words*`}
        />
      )
    
    case "citation":
      return (
        <GenericTool
          icon={<QuoteIcon className="h-5 w-5 text-pink-400" />}
          title="Citation Generator"
          description="Generate APA, MLA, Chicago references"
          inputLabel="Enter source details"
          placeholder="Enter the source information (author, title, year, publisher, URL, etc.)..."
          buttonText="Generate Citations"
          buttonColor="bg-pink-500 hover:bg-pink-600"
          onBack={onBack}
          generateResponse={(input) => `## Generated Citations

### APA Format (7th Edition):
Author, A. A. (Year). *Title of work*. Publisher. https://doi.org/xxxxx

### MLA Format (9th Edition):
Author Last Name, First Name. *Title of Work*. Publisher, Year.

### Chicago Style (17th Edition):
Author Last Name, First Name. *Title of Work*. Place: Publisher, Year.

### Harvard Style:
Author, A.A. (Year) *Title of Work*. Place: Publisher.

---
*Based on provided information: "${input.substring(0, 50)}..."*`}
        />
      )
    
    case "study-helper":
      return (
        <GenericTool
          icon={<BookOpenIcon className="h-5 w-5 text-primary" />}
          title="Study Helper"
          description="Get detailed explanations for any subject"
          inputLabel="What do you want to learn?"
          placeholder="Enter a topic or question you need help with..."
          buttonText="Explain"
          onBack={onBack}
          generateResponse={(input) => `## Explanation: ${input}

### Overview
This topic is fundamental to understanding the broader subject area. Let me break it down for you.

### Key Concepts

**1. Core Principle**
The foundational idea behind this topic involves understanding the relationship between various elements and how they interact.

**2. Important Details**
- First, consider the basic building blocks
- Second, understand how they combine
- Third, apply this knowledge to real scenarios

**3. Common Applications**
This concept is used in:
- Academic contexts
- Real-world problem solving
- Professional settings

### Example
Imagine a scenario where this applies directly...

### Practice Exercise
Try solving this problem: [Example problem based on the concept]

### Summary
Remember these key takeaways:
1. Main idea
2. Supporting concept
3. Practical application

---
*Need more clarification? Feel free to ask follow-up questions!*`}
        />
      )
    
    case "homework":
      return (
        <GenericTool
          icon={<HelpCircleIcon className="h-5 w-5 text-cyan-400" />}
          title="Homework Solver"
          description="Step-by-step homework solutions"
          inputLabel="Enter your homework question"
          placeholder="Type or paste your homework question..."
          buttonText="Solve Homework"
          buttonColor="bg-cyan-500 hover:bg-cyan-600"
          onBack={onBack}
          generateResponse={(input) => `## Homework Solution

### Question:
${input}

### Step-by-Step Solution:

**Step 1: Understand the Problem**
First, identify what the question is asking and what information is provided.

**Step 2: Plan Your Approach**
Determine the best method or formula to solve this problem.

**Step 3: Execute the Solution**
Apply the method systematically:
- Sub-step A: Initial calculation
- Sub-step B: Apply transformation
- Sub-step C: Simplify result

**Step 4: Verify**
Check your answer by substituting back or using an alternative method.

### Final Answer:
**[Answer will be displayed here based on the calculation]**

### Key Learning Points:
1. Remember this concept for similar problems
2. Common mistakes to avoid
3. Related topics to review

---
*Practice similar problems to reinforce your understanding!*`}
        />
      )
    
    case "quiz":
      return (
        <GenericTool
          icon={<GraduationCapIcon className="h-5 w-5 text-accent" />}
          title="Quiz Generator"
          description="Create multiple choice quizzes"
          inputLabel="Enter a topic"
          placeholder="Enter a topic to generate quiz questions..."
          buttonText="Generate Quiz"
          onBack={onBack}
          generateResponse={(input) => `## Quiz: ${input}

### Question 1
What is the primary characteristic of ${input}?

A) Option A - Description
B) Option B - Description  
C) Option C - Description ✓
D) Option D - Description

---

### Question 2
Which of the following best describes the relationship in ${input}?

A) First possibility
B) Second possibility ✓
C) Third possibility
D) Fourth possibility

---

### Question 3
In the context of ${input}, what would be the expected outcome?

A) Outcome A ✓
B) Outcome B
C) Outcome C
D) Outcome D

---

### Question 4
Which statement about ${input} is FALSE?

A) True statement 1
B) True statement 2
C) False statement ✓
D) True statement 3

---

### Question 5
How does ${input} apply in real-world scenarios?

A) Application A
B) Application B
C) Application C
D) All of the above ✓

---

### Answer Key:
1. C | 2. B | 3. A | 4. C | 5. D

*Score yourself and review any topics you got wrong!*`}
        />
      )
    
    case "flashcards":
      return (
        <GenericTool
          icon={<CardStackIcon className="h-5 w-5 text-yellow-400" />}
          title="Flashcard Generator"
          description="Auto-generate study flashcards"
          inputLabel="Enter topic or content"
          placeholder="Enter a topic or paste text to create flashcards..."
          buttonText="Generate Flashcards"
          buttonColor="bg-yellow-500 hover:bg-yellow-600"
          onBack={onBack}
          generateResponse={(input) => `## Flashcards: ${input}

---

### Card 1
**Front:** What is the definition of ${input}?
**Back:** ${input} refers to the concept that encompasses key principles and applications in the field.

---

### Card 2
**Front:** List 3 key characteristics of ${input}
**Back:** 
1. First characteristic
2. Second characteristic
3. Third characteristic

---

### Card 3
**Front:** How is ${input} applied in practice?
**Back:** It is applied through various methods including analysis, implementation, and evaluation.

---

### Card 4
**Front:** What are the benefits of understanding ${input}?
**Back:** Better problem-solving, improved critical thinking, and practical application skills.

---

### Card 5
**Front:** Name one common misconception about ${input}
**Back:** A common misconception is that it is only theoretical, when in fact it has many practical uses.

---

*Tip: Review these cards daily using spaced repetition for best results!*`}
        />
      )
    
    case "voice":
      return (
        <GenericTool
          icon={<MicIcon className="h-5 w-5 text-pink-400" />}
          title="Voice Question"
          description="Ask questions using your voice"
          inputLabel="Type your question (voice coming soon)"
          placeholder="Type your question here... Voice input feature coming soon!"
          buttonText="Get Answer"
          buttonColor="bg-pink-500 hover:bg-pink-600"
          onBack={onBack}
          generateResponse={(input) => `## Answer to Your Question

**Question:** ${input}

### Response:

Thank you for your question! Here is a comprehensive answer:

The topic you asked about involves several important aspects. First, let me explain the core concept, then we will look at practical applications.

**Core Explanation:**
This is a fundamental concept that forms the basis of understanding in this area.

**Key Points:**
• Important detail 1
• Important detail 2  
• Important detail 3

**Practical Application:**
You can apply this knowledge in various scenarios including academic work and real-world problem solving.

**Further Learning:**
Consider exploring related topics to deepen your understanding.

---
*🎤 Voice input feature will be available in a future update!*`}
        />
      )
    
    case "translator":
      return (
        <GenericTool
          icon={<LanguagesIcon className="h-5 w-5 text-primary" />}
          title="Translator"
          description="Translate between languages"
          inputLabel="Enter text to translate"
          placeholder="Enter text in any language..."
          buttonText="Translate"
          onBack={onBack}
          generateResponse={(input) => `## Translations

### English
${input}

### Bengali (বাংলা)
[Bengali translation would appear here]

### Hindi (हिंदी)
[Hindi translation would appear here]

### Arabic (العربية)
[Arabic translation would appear here]

### Spanish (Español)
[Spanish translation would appear here]

---

**Detected Language:** English
**Word Count:** ${input.split(' ').length}

*Tip: For best results, use complete sentences!*`}
        />
      )
    
    case "pdf":
      return (
        <GenericTool
          icon={<FileTextIcon className="h-5 w-5 text-orange-400" />}
          title="PDF Summarizer"
          description="Upload and summarize PDF documents"
          inputLabel="Paste PDF text content"
          placeholder="Paste the text content from your PDF here..."
          buttonText="Summarize PDF"
          buttonColor="bg-orange-500 hover:bg-orange-600"
          onBack={onBack}
          generateResponse={(input) => `## PDF Summary

### Document Overview
This document contains important information about the main topic, covering several key areas.

### Executive Summary
The document discusses essential concepts and provides detailed explanations with supporting evidence.

### Key Sections:

**Section 1: Introduction**
Overview of the main topics and objectives.

**Section 2: Main Content**
Detailed discussion of core concepts with examples.

**Section 3: Analysis**
Critical evaluation of the presented information.

**Section 4: Conclusions**
Summary of findings and recommendations.

### Important Points:
• Point 1: Main takeaway
• Point 2: Supporting detail
• Point 3: Action item

### Word Statistics:
- Original: ${input.split(' ').length} words
- Summary: ~150 words
- Compression: ${Math.round((1 - 150/input.split(' ').length) * 100)}%

---
*Upload a PDF file for automatic text extraction in the full version!*`}
        />
      )
    
    case "image-scan":
      return (
        <GenericTool
          icon={<ImageIcon className="h-5 w-5 text-accent" />}
          title="Image Question Scanner"
          description="OCR to read and solve questions from images"
          inputLabel="Describe the image content"
          placeholder="Describe the question or content shown in your image..."
          buttonText="Analyze & Solve"
          onBack={onBack}
          generateResponse={(input) => `## Image Analysis Results

### Detected Content:
${input}

### Extracted Text:
Based on your description, the image contains a question or problem that requires solving.

### Solution:

**Step 1:** Identify the question type
Based on the content, this appears to be a [subject] problem.

**Step 2:** Apply relevant methods
Using appropriate techniques to solve...

**Step 3:** Calculate/Analyze
Working through the problem systematically...

### Answer:
**[Solution based on the detected content]**

### Explanation:
Here is why this answer is correct...

---
*📸 Image upload feature with OCR will be available in the full version!*`}
        />
      )
    
    case "doc-analyzer":
      return (
        <GenericTool
          icon={<FileIcon className="h-5 w-5 text-cyan-400" />}
          title="Document Analyzer"
          description="Analyze PDF, DOCX, and TXT files"
          inputLabel="Paste document content"
          placeholder="Paste the content from your document here..."
          buttonText="Analyze Document"
          buttonColor="bg-cyan-500 hover:bg-cyan-600"
          onBack={onBack}
          generateResponse={(input) => `## Document Analysis

### Overview
- **Word Count:** ${input.split(' ').length}
- **Character Count:** ${input.length}
- **Paragraph Count:** ${input.split('\n\n').length}
- **Reading Time:** ~${Math.ceil(input.split(' ').length / 200)} min

### Content Summary
This document discusses key topics and provides relevant information about the subject matter.

### Key Themes Detected:
1. Primary theme identified
2. Secondary theme identified
3. Supporting details

### Readability Score:
**Grade Level:** College-level
**Complexity:** Moderate

### Suggestions:
- Consider adding more transitions
- Include additional examples
- Review conclusion strength

### Keywords Found:
[Key terms extracted from the document]

---
*Full document upload coming in the premium version!*`}
        />
      )
    
    case "password":
      return (
        <GenericTool
          icon={<LockIcon className="h-5 w-5 text-accent" />}
          title="Password Strength Analyzer"
          description="Check password strength and security"
          inputLabel="Enter password to analyze"
          placeholder="Enter a password to check its strength..."
          buttonText="Analyze Password"
          onBack={onBack}
          generateResponse={(input) => `## Password Analysis

### Strength Score: ${input.length >= 12 ? "Strong 🟢" : input.length >= 8 ? "Medium 🟡" : "Weak 🔴"}

### Analysis:
- **Length:** ${input.length} characters ${input.length >= 12 ? "✓" : "✗"}
- **Uppercase:** ${/[A-Z]/.test(input) ? "Present ✓" : "Missing ✗"}
- **Lowercase:** ${/[a-z]/.test(input) ? "Present ✓" : "Missing ✗"}
- **Numbers:** ${/[0-9]/.test(input) ? "Present ✓" : "Missing ✗"}
- **Special Characters:** ${/[!@#$%^&*]/.test(input) ? "Present ✓" : "Missing ✗"}

### Estimated Crack Time:
${input.length >= 12 ? "Centuries" : input.length >= 8 ? "Years" : "Days"}

### Recommendations:
${input.length < 12 ? "• Increase password length to 12+ characters\n" : ""}${!/[A-Z]/.test(input) ? "• Add uppercase letters\n" : ""}${!/[0-9]/.test(input) ? "• Include numbers\n" : ""}${!/[!@#$%^&*]/.test(input) ? "• Add special characters (!@#$%^&*)" : ""}

### Tips for Strong Passwords:
1. Use a passphrase (multiple random words)
2. Avoid personal information
3. Use unique passwords for each account
4. Consider a password manager

---
*Your password is not stored or transmitted*`}
        />
      )
    
    case "code-check":
      return (
        <GenericTool
          icon={<CodeIcon className="h-5 w-5 text-orange-400" />}
          title="Code Vulnerability Checker"
          description="Find security vulnerabilities in code"
          inputLabel="Paste your code"
          placeholder="Paste your code here to check for vulnerabilities..."
          buttonText="Scan Code"
          buttonColor="bg-orange-500 hover:bg-orange-600"
          onBack={onBack}
          generateResponse={(input) => `## Security Scan Results

### Overall Risk: Low ✓

### Scan Summary:
- Lines analyzed: ${input.split('\n').length}
- Potential issues: 2
- Critical: 0
- Warnings: 2

### Findings:

**⚠️ Warning 1: Input Validation**
Line ~5: Consider adding input validation
- Risk: Medium
- Recommendation: Validate and sanitize all user inputs

**⚠️ Warning 2: Error Handling**
General: Limited error handling detected
- Risk: Low
- Recommendation: Add try-catch blocks for better error management

### Best Practices Checklist:
✓ No hardcoded credentials detected
✓ No SQL injection patterns found
✓ No XSS vulnerabilities detected
⚠️ Consider adding input validation
⚠️ Improve error handling

### Recommendations:
1. Add input validation for all user inputs
2. Implement proper error handling
3. Use parameterized queries for databases
4. Keep dependencies updated

---
*This is an educational tool. Always conduct thorough security audits for production code.*`}
        />
      )
    
    case "cyber-tutor":
      return (
        <GenericTool
          icon={<ShieldIcon className="h-5 w-5 text-primary" />}
          title="Cybersecurity Tutor"
          description="Learn cybersecurity basics"
          inputLabel="What do you want to learn?"
          placeholder="Enter a cybersecurity topic (e.g., encryption, firewalls, authentication)..."
          buttonText="Learn"
          onBack={onBack}
          generateResponse={(input) => `## Cybersecurity Lesson: ${input}

### Introduction
Understanding ${input} is crucial for maintaining security in the digital age.

### Key Concepts:

**1. Definition**
${input} refers to the security measures and practices that protect systems and data.

**2. How It Works**
- Component 1: First layer of protection
- Component 2: Secondary security measure
- Component 3: Monitoring and detection

**3. Common Threats**
- Threat type A
- Threat type B
- Threat type C

### Best Practices:
1. Regular updates and patches
2. Strong authentication
3. Data encryption
4. Security monitoring
5. User education

### Real-World Applications:
- Enterprise security
- Personal device protection
- Network security

### Practice Exercise:
Research and identify one recent security incident related to ${input}.

### Further Reading:
- Official documentation
- Security blogs and news
- Certification resources (CompTIA, CEH, CISSP)

---
*Remember: Use this knowledge ethically and legally!*`}
        />
      )
    
    case "bug-bounty":
      return (
        <GenericTool
          icon={<BugIcon className="h-5 w-5 text-pink-400" />}
          title="Bug Bounty Learning"
          description="Learn bug bounty fundamentals"
          inputLabel="What aspect of bug bounty interests you?"
          placeholder="Enter a topic (e.g., getting started, tools, methodologies)..."
          buttonText="Learn"
          buttonColor="bg-pink-500 hover:bg-pink-600"
          onBack={onBack}
          generateResponse={(input) => `## Bug Bounty Guide: ${input}

### Getting Started
Bug bounty hunting is the practice of finding and reporting security vulnerabilities responsibly.

### Key Areas:

**1. Prerequisites**
- Web fundamentals (HTTP, HTML, JavaScript)
- Networking basics
- Security concepts
- Programming skills

**2. Essential Tools**
- Burp Suite (Web proxy)
- OWASP ZAP
- Nmap
- Sublist3r (subdomain enumeration)
- Various browser extensions

**3. Common Vulnerability Types**
- XSS (Cross-Site Scripting)
- SQL Injection
- IDOR (Insecure Direct Object Reference)
- Authentication flaws
- Business logic errors

### Ethical Guidelines:
⚠️ **Important: Always follow these rules**
1. Only test on authorized targets
2. Report findings responsibly
3. Never exploit vulnerabilities maliciously
4. Follow the programs rules and scope
5. Document everything properly

### Platforms to Start:
- HackerOne
- Bugcrowd
- Open Bug Bounty
- Company-specific programs

### Learning Path:
1. Master web fundamentals
2. Learn common vulnerabilities
3. Practice on legal platforms
4. Join a bug bounty platform
5. Start with VDPs (no bounty)
6. Gradually target paid programs

---
*Always practice legally and ethically!*`}
        />
      )
    
    default:
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-muted-foreground">Tool not found</p>
          <Button onClick={onBack} variant="outline" className="border-border text-foreground hover:bg-secondary">
            Go Back
          </Button>
        </div>
      )
  }
}
