# U-Haul WebAMT Tools

**Disclaimer:** These tools are not offically supported by U-Haul and are subject to changes in AMT. If there are any issues, please open an issue in GitHub. 

## What are these tools?

These are a current list of the tools, and what they do: 

* **filter_by_availability.js** will do just that -- remove all the non-green locations off of the list, with the bonus of adding city/state information to the list. The city/state information will be added as you use the tool, or you can quickly learn the locations using the following tool:
    * Using **quick_learn_locations.js** you can open a `Location Search` under Tools in AMT, and quickly import city/state information for use in the above tool

* **open_pendings.js** is probably the most simple -- this tool coninually looks for a new contract number to be available, and when found, will open the ESL to contextualize the availability. This is great for pending agreements.

## How do I use these? 

The following instructions are for both Windows and Mac users: 

- Start with AMT open
- Right click, and click `Inspect`
- A new window will open. Click "Sources"
- If `Snippets` is not shown, use the chevron to open that menu
- Right click in the side bar to `Create new snippet.` You can copy and paste the code on this page for use in these snippets.

### Running the snippets

- Use the instructions above, but instead of creating a new snippet, use the keyboard shortcut `CTRL + Enter` to run the snippet. Especially with `filter_by_availability.js`, it will be fairly obvious when you've run the shortcut correctly. 