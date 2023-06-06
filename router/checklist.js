import express from 'express';
// experimental
// import tasks from "../public/wcag.json" assert { type: "json" };
const router = express.Router();

router.get('/', (req, res) => {
    res.render('checklist', {
        tasks: tasks
    });
});

router.post('/submit', (req, res) => {
    console.log(req.body)
    res.json("hiii")
});

let tasks = [
    {
      "wcag_id": 1,
      "title": "Content",
      "description": "Content is the most important part of your site.",
      "items": [
        {
          "wcag_item_id": 1,
          "title": "Use plain language and avoid figures of speech, idioms, and complicated metaphors.",
          "wcagTitle": "3.1.5 Reading Level",
          "wcagText": "Write content at <a href=\"https://datayze.com/readability-analyzer.php\">an 8th grade reading level</a>.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-supplements.html"
        },
        {
          "wcag_item_id": 2,
          "title": "Make sure that <code>button</code>, <code>a</code>, and <code>label</code> element content is unique and descriptive.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Terms like “click here” and “read more” do not provide any context. Some people navigate using a list of all buttons or links on a page or view. When using this mode, the terms indicate what will happen if navigated to or activated.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 3,
          "title": "Use left-aligned text for left-to-right (<abbr>LTR</abbr>) languages, and right-aligned text for right-to-left (<abbr>RTL</abbr>) languages.",
          "wcagTitle": "1.4.8 Visual Presentation",
          "wcagText": "Centered-aligned or justified text is difficult to read.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html"
        }
      ]
    },
    {
      "wcag_id": 2,
      "title": "Global code",
      "description": "Global code is code that affects your entire website or web app.",
      "items": [
        {
          "wcag_item_id": 4,
          "title": "Validate your HTML.",
          "wcagTitle": "4.1.1 Parsing",
          "wcagText": "<a href=\"https://validator.w3.org/nu/\">Valid HTML</a> helps to provide a consistent, expected experience across all browsers and assistive technology.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-parses.html"
        },
        {
          "wcag_item_id": 5,
          "title": "Use a <code>lang</code> attribute on the <code>html</code> element.",
          "wcagTitle": "3.1.1 Language of Page",
          "wcagText": "This helps assistive technology such as screen readers to <a href=\"https://github.com/FreedomScientific/VFO-standards-support/issues/188\">pronounce content correctly</a>.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-doc-lang-id.html"
        },
        {
          "wcag_item_id": 6,
          "title": "Provide a unique <code>title</code> for each page or view.",
          "wcagTitle": "2.4.2 Page Titled",
          "wcagText": "The <code>title</code> element, contained in the document's <code>head</code> element, is often the first piece of information announced by assistive technology. This helps tell people what page or view they are going to start navigating.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html"
        },
        {
          "wcag_item_id": 7,
          "title": "Ensure that viewport zoom is not disabled.",
          "wcagTitle": "1.4.4 Resize text",
          "wcagText": "Some people need to increase the size of text to a point where they can read it. Do not stop them from doing this, even for web apps with a native app-like experience. Even native apps should respect Operating System settings for resizing text.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html"
        },
        {
          "wcag_item_id": 8,
          "title": "Use landmark elements to indicate important content regions.",
          "wcagTitle": "4.1.2 Name, Role, Value",
          "wcagText": "<a href=\"https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html\">Landmark regions</a> help communicate the layout and important areas of a page or view, and can allow quick access to these regions. For example, use the <code>nav</code> element to wrap a site's navigation, and the <code>main</code> element to contain the primary content of a page.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html"
        },
        {
          "wcag_item_id": 9,
          "title": "Ensure a linear content flow.",
          "wcagTitle": "2.4.3 Focus Order",
          "wcagText": "Remove <code>tabindex</code> attribute values that aren't either <code>0</code> or <code>-1</code>. Elements that are inherently focusable, such as links or <code>button</code> elements, do not require a <code>tabindex</code>. Elements that are not inherently focusable should not have a <code>tabindex</code> applied to them outside of very specific use cases.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html"
        },
        {
          "wcag_item_id": 10,
          "title": "Avoid using the <code>autofocus</code> attribute.",
          "wcagTitle": "2.4.3 Focus Order",
          "wcagText": "People who are blind or who have low vision may be disoriented when focus is moved without their permission. Additionally, <code>autofocus</code> can be problematic for people with motor control disabilities, as it may create extra work for them to navigate out from the autofocused area and to other locations on the page/view.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html"
        },
        {
          "wcag_item_id": 11,
          "title": "Allow extending session timeouts.",
          "wcagTitle": "2.2.1 Timing Adjustable",
          "wcagText": "If you cannot remove session timeouts altogether, then let the person using your site easily turn off, adjust, or extend their session well before it ends.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-required-behaviors.html"
        },
        {
          "wcag_item_id": 12,
          "title": "Remove <code>title</code> attribute tooltips.",
          "wcagTitle": "4.1.2 Name, Role, Value",
          "wcagText": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title#Accessibility_concerns\">The <code>title</code> attribute has numerous issues</a>, and should not be used if the information provided is important for all people to access. An acceptable use for the <code>title</code> attribute would be labeling an <code>iframe</code> element to indicate what content it contains.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html"
        }
      ]
    },
    {
      "wcag_id": 3,
      "title": "Keyboard",
      "description": "It is important that your interface and content can be operated, and navigated by use of a keyboard. Some people cannot use a mouse, or may be using other assistive technologies that may not allow for hovering or precise clicking.",
      "items": [
        {
          "wcag_item_id": 13,
          "title": "Make sure there is a visible focus style for interactive elements that are navigated to via keyboard input.",
          "wcagTitle": "2.4.7 Focus Visible",
          "wcagText": "Can a person navigating with a keyboard, <a href=\"https://axesslab.com/switches/\">switch</a>, voice control, or screen reader see where they currently are on the page?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html"
        },
        {
          "wcag_item_id": 14,
          "title": "Check to see that keyboard focus order matches the visual layout.",
          "wcagTitle": "1.3.2 Meaningful Sequence",
          "wcagText": "Can a person navigating with a keyboard or screen reader move around the page in a predictable way?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-sequence.html"
        },
        {
          "wcag_item_id": 15,
          "title": "Remove invisible focusable elements.",
          "wcagTitle": "2.4.3 Focus Order",
          "wcagText": "Remove the ability to focus on elements that are not presently meant to be discoverable. This includes things like inactive drop down menus, off screen navigations, or modals.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html"
        }
      ]
    },
    {
      "wcag_id": 4,
      "title": "Images",
      "description": "Images are a very common part of most websites. Help make sure they can be enjoyed by all.",
      "items": [
        {
          "wcag_item_id": 16,
          "title": "Make sure that all <code>img</code> elements have an <code>alt</code> attribute.",
          "wcagTitle": "1.1.1 Non-text Content",
          "wcagText": "<code>alt</code> attributes (alt text) give a description of an image for people who may not be able to view them. When an <code>alt</code> attribute isn't present on an image, a screen reader may announce the image's file name and path instead. This fails to communicate the image’s content.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html"
        },
        {
          "wcag_item_id": 17,
          "title": "Make sure that decorative images use null <code>alt</code> (empty) attribute values.",
          "wcagTitle": "1.1.1 Non-text Content",
          "wcagText": "Null <code>alt</code> attributes are also sometimes known as empty <code>alt</code> attributes. They are made by including no information between the opening and closing quotes of an <code>alt</code> attribute. Decorative images do not communicate information that is required to understand the website's overall meaning. Historically they were used for flourishes and <a href=\"https://en.wikipedia.org/wiki/Spacer_GIF\">spacer gif</a> images, but tend to be less relevant for modern websites and web apps.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html"
        },
        {
          "wcag_item_id": 18,
          "title": "Provide a text alternative for complex images such as charts, graphs, and maps.",
          "wcagTitle": "1.1.1 Non-text Content",
          "wcagText": "Is there a plain text which lists points on the map or sections of a flowchart? Describe all visible information. This includes graph axes, data points and labels, and the overall point the graphic is communicating.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html"
        },
        {
          "wcag_item_id": 19,
          "title": "For images containing text, make sure the alt description includes the image's text.",
          "wcagTitle": "1.1.1 Non-text Content",
          "wcagText": "For example, the FedEx logo should have an alt value of “FedEx.”",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html"
        }
      ]
    },
    {
      "wcag_id": 5,
      "title": "Headings",
      "description": "Heading elements (h1, h2, h3, etc.) help break up the content of the page into related “chunks” of information. They are incredibly important for helping people who use assistive technology to understand the meaning of a page or view.",
      "items": [
        {
          "wcag_item_id": 20,
          "title": "Use heading elements to introduce content.",
          "wcagTitle": "2.4.6 Headings or Labels",
          "wcagText": "Heading elements construct a document outline, and should not be used for purely visual design.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html"
        },
        {
          "wcag_item_id": 21,
          "title": "Use only one <code>h1</code> element per page or view.",
          "wcagTitle": "2.4.6 Headings or Labels",
          "wcagText": "The <code>h1</code> element should be used to communicate the high-level purpose of the page or view. Do not use the <code>h1</code> element for a heading that does not change between pages or views (for example, the site's name).",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html"
        },
        {
          "wcag_item_id": 22,
          "title": "Heading elements should be written in a logical sequence.",
          "wcagTitle": "2.4.6 Headings or Labels",
          "wcagText": "<a href=\"https://webdesign.tutsplus.com/articles/the-importance-of-heading-levels-for-assistive-technology--cms-31753\">The order of heading elements</a> should descend, based on the “depth” of the content. For example, a <code>h4</code> element should not appear on a page before the first <code>h3</code> element declaration. A tool such as <a href=\"/resources/#headingsmap\">headingsMap</a> can help you evaluate this.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html"
        },
        {
          "wcag_item_id": 23,
          "title": "Don't skip heading levels.",
          "wcagTitle": "2.4.6 Headings or Labels",
          "wcagText": "For example, don't jump from a <code>h2</code> to a <code>h4</code>, skipping a <code>h3</code> element. If heading levels are being skipped for a specific visual treatment, use CSS classes instead.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html"
        }
      ]
    },
    {
      "wcag_id": 6,
      "title": "Lists",
      "description": "Lists elements let people know a collection of items are related and if they are sequential, and how many items are present in the list grouping.",
      "items": [
        {
          "wcag_item_id": 24,
          "title": "Use list elements (<code>ol</code>, <code>ul</code>, and <code>dl</code> elements) for list content.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "This may include sections of related content, items visually displayed in a grid-like layout, or sibling a elements.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        }
      ]
    },
    {
      "wcag_id": 7,
      "title": "Controls",
      "description": "Controls are interactive elements such as links and buttons that let a person navigate to a destination or perform an action.",
      "items": [
        {
          "wcag_item_id": 25,
          "title": "Use the <code>a</code> element for links.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Links should always have a <code>href</code> attribute, even when used in Single Page Applications (<abbr>SPA</abbr>s). Without a <code>href</code> attribute, the link will not be properly exposed to assistive technology. An example of this would be a link that uses an <code>onclick</code> event, in place of a <code>href</code> attribute.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 26,
          "title": "Ensure that links are recognizable as links.",
          "wcagTitle": "1.4.1 Use of Color",
          "wcagText": "Color alone is not sufficient to indicate the presence of a link. Underlines are a popular and commonly-understood way to communicate the presence of link content.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html"
        },
        {
          "wcag_item_id": 27,
          "title": "Ensure that controls have <code>:focus</code> states.",
          "wcagTitle": "2.4.7 Focus Visible",
          "wcagText": "Visible focus styles help people determine which interactive element has keyboard focus. This lets them know that they can perform actions like activating a button or navigating to a link's destination.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html"
        },
        {
          "wcag_item_id": 28,
          "title": "Use the <code>button</code> element for buttons.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Buttons are used to submit data or perform an on-screen action which does not shift keyboard focus. You can add <code>type=\"button\"</code> to a <code>button</code> element to prevent the browser from attempting to submit form information when activated.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 29,
          "title": "Provide a skip link and make sure that it is visible when focused.",
          "wcagTitle": "2.4.1 Bypass Blocks",
          "wcagText": "A <a href=\"/posts/skip-nav-links/\">skip link</a> can be used to provide quick access to the main content of a page or view. This allows a person to easily bypass globally repeated content such as a website's primary navigation, or persistent search widget.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html"
        },
        {
          "wcag_item_id": 30,
          "title": "Identify links that open in a new tab or window.",
          "wcagTitle": "G201: Giving users advanced warning when opening a new window",
          "wcagText": "Ideally, avoid links that open in a new tab or window. If a link does, ensure the link's behavior will be communicated in a way that is apparent to all users. Doing this will help people understand what will happen before activating the link. While this technique is technically not required for compliance, it is an often-cited area of frustration for many different kinds of assistive technology users.",
          "wcagHref": "https://www.w3.org/TR/WCAG20-TECHS/G201.html"
        }
      ]
    },
    {
      "wcag_id": 8,
      "title": "Tables",
      "description": "Tables are a structured set of data that help people understand the relationships between different types of information.",
      "items": [
        {
          "wcag_item_id": 31,
          "title": "Use the <code>table</code> element to describe tabular data.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Do you need to display data in rows and columns? Use the <code>table</code> element.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 32,
          "title": "Use the <code>th</code> element for table headers (with appropriate <code>scope</code> attributes).",
          "wcagTitle": "4.1.1 Parsing",
          "wcagText": "Depending on <a href=\"https://www.w3.org/WAI/tutorials/tables/\">how complex your table is</a>, you may also consider using <code>scope=\"col\"</code> for column headers, and <code>scope=\"row\"</code> for row headers. Many different kinds of assistive technology still use the <code>scope</code> attribute to help them understand and describe the structure of a table.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-parses.html"
        },
        {
          "wcag_item_id": 33,
          "title": "Use the <code>caption</code> element to provide a title for the table.",
          "wcagTitle": "2.4.6 Headings or Labels",
          "wcagText": "The table's <code>caption</code> should describe what kind of information the table contains.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html"
        }
      ]
    },
    {
      "wcag_id": 9,
      "title": "Forms",
      "description": "Forms allow people to enter information into a site for processing and manipulation. This includes things like sending messages and placing orders.",
      "items": [
        {
          "wcag_item_id": 34,
          "title": "All inputs in a form are associated with a corresponding <code>label</code> element.",
          "wcagTitle": "3.2.2 On Input",
          "wcagText": "Use a <code>for</code>/<code>id</code> pairing to guarantee the highest level of browser/assistive technology support.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html"
        },
        {
          "wcag_item_id": 35,
          "title": "Use <code>fieldset</code> and <code>legend</code> elements where appropriate.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Does your form contain multiple sections of related inputs? Use <code>fieldset</code> to group them, and <code>legend</code> to provide a label for what this section is for.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 36,
          "title": "Inputs use <code>autocomplete</code> where appropriate.",
          "wcagTitle": "1.3.5 Identify Input Purpose",
          "wcagText": "<a href=\"https://www.w3.org/TR/html52/sec-forms.html#sec-autofill\">Providing a mechanism</a> to help people more quickly, easily, and accurately fill in form fields that ask for common information (for example, name, address, phone number).",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html"
        },
        {
          "wcag_item_id": 37,
          "title": "Make sure that form input errors are displayed in list above the form after submission.",
          "wcagTitle": "3.3.1 Error Identification",
          "wcagText": "This provides a way for assistive technology users to quickly have a high-level understanding of what issues are present in the form. This is especially important for larger forms with many inputs. Make sure that each reported error also has a link to the corresponding field with invalid input.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html"
        },
        {
          "wcag_item_id": 38,
          "title": "Associate input error messaging with the input it corresponds to.",
          "wcagTitle": "3.3.1 Error Identification",
          "wcagText": "Techniques such as <a href=\"https://developer.paciellogroup.com/blog/2018/09/describing-aria-describedby/\">using <code>aria-describedby</code></a> allow people who use assistive technology to more easily understand the difference between the input and the error message associated with it.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html"
        },
        {
          "wcag_item_id": 39,
          "title": "Make sure that error, warning, and success states are not visually communicated by just color.",
          "wcagTitle": "1.4.1 Use of Color",
          "wcagText": "People who are color blind, who have other low vision conditions, or different cultural understandings for color may not see the state change, or understand what kind of feedback the state represents if color is the only indicator.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html"
        }
      ]
    },
    {
      "wcag_id": 10,
      "title": "Media",
      "description": "Media includes content such as pre-recorded and live audio and video.",
      "items": [
        {
          "wcag_item_id": 40,
          "title": "Make sure that media does not autoplay.",
          "wcagTitle": "1.4.2 Audio Control",
          "wcagText": "Unexpected video and audio can be distracting and disruptive, especially for certain kinds of cognitive disability such as ADHD. Certain kinds of autoplaying video and animation can be a trigger for vestibular and seizure disorders.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-dis-audio.html"
        },
        {
          "wcag_item_id": 41,
          "title": "Ensure that media controls use appropriate markup.",
          "wcagTitle": "1.3.1 Info and Relationships",
          "wcagText": "Examples include making sure an audio mute button has <a href=\"https://www.w3.org/WAI/PF/aria/states_and_properties#aria-pressed\">a pressed toggle state</a> when active, or that a volume slider uses <code>&lt;input type=\"range\"&gt;</code>.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html"
        },
        {
          "wcag_item_id": 42,
          "title": "Check to see that all media can be paused.",
          "wcagTitle": "2.1.1 Keyboard",
          "wcagText": "Provide a global pause function on any media element. If the device has a keyboard, ensure that pressing the <kbd>Space</kbd> key can pause playback. Make sure you also don't interfere with the <kbd>Space</kbd> key's ability to scroll the page/view when not focusing on a form control.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-keyboard-operable.html"
        }
      ]
    },
    {
      "wcag_id": 11,
      "title": "Video",
      "description": "Video-specific checks.",
      "items": [
        {
          "wcag_item_id": 43,
          "title": "Confirm the presence of captions.",
          "wcagTitle": "1.2.2 Captions",
          "wcagText": "Captions allow a person who cannot hear the audio content of a video to still understand its content.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html"
        },
        {
          "wcag_item_id": 44,
          "title": "Remove seizure triggers.",
          "wcagTitle": "2.3.1 Three Flashes or Below Threshold",
          "wcagText": "Certain kinds of strobing or flashing animations will trigger seizures.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html"
        }
      ]
    },
    {
      "wcag_id": 12,
      "title": "Audio",
      "description": "Audio-specific checks.",
      "items": [
        {
          "wcag_item_id": 45,
          "title": "Confirm that transcripts are available.",
          "wcagTitle": "1.1.1 Non-text Content",
          "wcagText": "Transcripts allow people who cannot hear to still understand the audio content. It also allows people to digest audio content at a pace that is comfortable to them.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html"
        }
      ]
    },
    {
      "wcag_id": 13,
      "title": "Appearance",
      "description": "How your website app content looks in any given situation.",
      "items": [
        {
          "wcag_item_id": 46,
          "title": "Check your content in specialized browsing modes.",
          "wcagTitle": "1.4.1 Use of Color",
          "wcagText": "Activate <a href=\"/posts/operating-system-and-browser-accessibility-display-modes/\">modes such as Windows High Contrast or Inverted Colors</a>. Is your content still legible? Are your icons, borders, links, form fields, and other content still present? Can you distinguish foreground content from the background?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html"
        },
        {
          "wcag_item_id": 47,
          "title": "Increase text size to 200%.",
          "wcagTitle": "1.4.4 Resize text",
          "wcagText": "Is the content still readable? Does increasing the text size cause content to overlap?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html"
        },
        {
          "wcag_item_id": 48,
          "title": "Double-check that good proximity between content is maintained.",
          "wcagTitle": "1.3.3 Sensory Characteristics",
          "wcagText": "Use <a href=\"https://scottvinkle.me/blogs/work/proximity-and-zoom\">the straw test</a> to ensure people who depend on screen zoom software can still easily discover all content.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-understanding.html"
        },
        {
          "wcag_item_id": 49,
          "title": "Make sure color isn't the only way information is conveyed.",
          "wcagTitle": "1.4.1 Use of Color",
          "wcagText": "Can you still see where links are among body content if everything is grayscale?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html"
        },
        {
          "wcag_item_id": 50,
          "title": "Make sure instructions are not visual or audio-only.",
          "wcagTitle": "1.3.3 Sensory Characteristics",
          "wcagText": "Use a combination of characteristics to write cues, particularly the actual names of sections and elements, rather than just descriptions like location (“on the right”) or audio (“after the tone”).",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html"
        },
        {
          "wcag_item_id": 51,
          "title": "Use a simple, straightforward, and consistent layout.",
          "wcagTitle": "1.4.10 Reflow",
          "wcagText": "A complicated layout can be confusing to understand and use.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/reflow.html"
        }
      ]
    },
    {
      "wcag_id": 14,
      "title": "Animation",
      "description": "Content that moves, either on its own, or when triggered by a person activating a control.",
      "items": [
        {
          "wcag_item_id": 52,
          "title": "Ensure animations are subtle and do not flash too much.",
          "wcagTitle": "2.3.1 Three Flashes or Below Threshold",
          "wcagText": "Certain kinds of strobing or flashing animations will trigger seizures. Others may be distracting and disruptive, especially for certain kinds of cognitive disability such as ADHD.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html"
        },
        {
          "wcag_item_id": 53,
          "title": "Provide a mechanism to pause background video.",
          "wcagTitle": "2.2.2 Pause, Stop, Hide",
          "wcagText": "Background video can be distracting, especially if content is placed over it.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html"
        },
        {
          "wcag_item_id": 54,
          "title": "Make sure all animation obeys the <code>prefers-reduced-motion</code> media query.",
          "wcagTitle": "2.3.3 Animation from Interactions",
          "wcagText": "Remove animations when the “reduce motion” setting is activated. If an animation is necessary to communicate meaning for a concept, slow its duration down.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html"
        }
      ]
    },
    {
      "wcag_id": 15,
      "title": "Color contrast",
      "description": "Color contrast is how legible colors are when placed next to, and on top of each other.",
      "items": [
        {
          "wcag_item_id": 55,
          "title": "Check the contrast for all normal-sized text.",
          "wcagTitle": "1.4.3 Contrast",
          "wcagText": "Level AA compliance requires a contrast ratio of 4.5:1.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
        },
        {
          "wcag_item_id": 56,
          "title": "Check the contrast for all large-sized text.",
          "wcagTitle": "1.4.3 Contrast",
          "wcagText": "Level AA compliance requires a contrast ratio of 3:1.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
        },
        {
          "wcag_item_id": 57,
          "title": "Check the contrast for all icons.",
          "wcagTitle": "1.4.11 Non-text Contrast",
          "wcagText": "Level AA compliance requires a contrast ratio of 3.0:1.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
        },
        {
          "wcag_item_id": 58,
          "title": "Check the contrast of borders for input elements (text input, radio buttons, checkboxes, etc.).",
          "wcagTitle": "1.4.11 Non-text Contrast",
          "wcagText": "Level AA compliance requires a contrast ratio of 3.0:1.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
        },
        {
          "wcag_item_id": 59,
          "title": "Check text that overlaps images or video.",
          "wcagTitle": "1.4.3 Contrast",
          "wcagText": "Is text still legible?",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
        },
        {
          "wcag_item_id": 60,
          "title": "Check custom <code>::selection</code> colors.",
          "wcagTitle": "1.4.3 Contrast",
          "wcagText": "Is the color contrast you set in your <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/::selection\"><code>::selection</code> CSS declaration</a> sufficient? Otherwise someone may not be able read it if they highlight it.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
        }
      ]
    },
    {
      "wcag_id": 16,
      "title": "Mobile and touch",
      "description": "Things to check mobile experiences for.",
      "items": [
        {
          "wcag_item_id": 61,
          "title": "Check that the site can be rotated to any orientation.",
          "wcagTitle": "1.3.4 Orientation",
          "wcagText": "Does the site only allow portrait orientation?",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/orientation.html"
        },
        {
          "wcag_item_id": 62,
          "title": "Remove horizontal scrolling.",
          "wcagTitle": "1.4.10 Reflow",
          "wcagText": "Requiring someone to scroll horizontally can be difficult for some, irritating for all.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/reflow.html"
        },
        {
          "wcag_item_id": 63,
          "title": "Ensure that button and link icons can be activated with ease.",
          "wcagTitle": "2.5.5 Target Size",
          "wcagText": "It's good to make sure things like hamburger menus, social icons, gallery viewers, and other touch controls are usable by a wide range of hand and stylus sizes.",
          "wcagHref": "https://www.w3.org/WAI/WCAG21/Understanding/target-size.html"
        },
        {
          "wcag_item_id": 64,
          "title": "Ensure sufficient space between interactive items in order to provide a scroll area.",
          "wcagTitle": "2.4.1 Bypass Blocks",
          "wcagText": "Some people who experience motor control issues such as <a href=\"https://axesslab.com/hand-tremors/\">hand tremors</a> may have a very difficult time scrolling past interactive items which feature zero spacing.",
          "wcagHref": "https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html"
        }
      ]
    }
  ]



export default router;
