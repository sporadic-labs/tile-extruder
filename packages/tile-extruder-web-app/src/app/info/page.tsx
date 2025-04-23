import Image from "next/image";
import Link from "next/link";

export default function InfoPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About Tile Extruder</h1>
        </div>

        <div className="prose prose-slate max-w-[850px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 first:mt-0">The Problem</h2>
          <p>
            When rendering tiles in game engines, you may encounter &ldquo;bleeding&rdquo; issues
            where tiles are rendered with the wrong color at the edges:
          </p>
          <Image
            src="/images/demo.png"
            alt="Demo of tile extrusion"
            width={861}
            height={487}
            className="mx-auto max-w-[600px] border border-gray-200 rounded-lg"
          />
          <p>
            You can read more about the bleeding problem and solution{" "}
            <a
              href="https://web.archive.org/web/20180411151113/http://rotorz.com/unity/tile-system/docs/edge-correction"
              className="text-blue-600 hover:text-blue-800"
            >
              here
            </a>
            . The TLDR is that there are many ways this type of rendering artifact can occur, e.g.
            from pixels being incorrectly blended when the edge of a tile in a tilemap texture is
            rendered.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Solution</h2>
          <p>
            Tile Extruder solves this problem by extruding the edges of each tile outward, creating
            a buffer zone that prevents color bleeding.
          </p>
          <Image
            src="/images/explanation.png"
            alt="Visual explanation of tile extrusion"
            width={200}
            height={200}
            className="mx-auto border border-gray-200 rounded-lg"
          />
          <p>
            You can extrude a tileset using this web app, or via the sister command line tool (CLI).
            For more info on the CLI, see the{" "}
            <Link
              href="https://github.com/sporadic-labs/tile-extruder"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub repository
            </Link>
            .
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Using an Extruded Tileset
          </h2>
          <p>
            This tool was built for a Phaser & Tiled project, so here&apos;s how to integrate with
            that pipeline.
          </p>
          <p>
            If you&apos;ve already built a map in Tiled with a non-extruded tileset and are looking
            to replace it with an extruded tileset, you&apos;ve got a couple options:
          </p>
          <ol>
            <li>
              Extrude the tileset and then update your existing tileset in Tiled. In the
              &ldquo;Tilesets&rdquo; panel, click on the edit tileset icon (the wrench) and then
              click on &ldquo;Tileset Properties&rdquo; under the Tileset menu bar item. Edit the
              &ldquo;Image&rdquo; field, replacing the tileset image with the new extruded image and
              updating to the margin and spacing.
            </li>
            <li>
              If you&apos;d rather leave your Tiled file alone, you can just adjust things on the
              Phaser side. See this{" "}
              <Link
                href="https://github.com/sporadic-labs/tile-extruder/tree/main/packages/phaser-example"
                className="text-blue-600 hover:text-blue-800"
              >
                example
              </Link>
              . You want to load the extruded tileset image, and then when you create your tileset,
              specify the appropriate margin and spacing:
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm mt-2 font-mono">
                {/* Parameters: name in Tiled, phaser cache key, tile width, tile height, margin, spacing */}
                const tileset = map.addTilesetImage(&quot;tileset&quot;,
                &quot;tileset-extruded&quot;, 48, 48, 1, 2);
              </pre>
            </li>
          </ol>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg my-4">
            <p className="text-yellow-700">
              <strong>Note:</strong> You&apos;ll have to adjust your margin & spacing because of the
              extrusion. If you had no margin & spacing, then a tileset that has been extruded by
              1px will have a margin of 1px and a spacing of 2px.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
