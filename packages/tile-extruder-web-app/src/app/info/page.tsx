import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { classnames } from "../utils/classnames";

export default function InfoPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About Tile Extruder</h1>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>The Problem</h2>
          <p>
            When rendering tiles in game engines, you may encounter &ldquo;bleeding&rdquo; issues
            where tiles are rendered with the wrong color at the edges:
          </p>
          <Image
            src="/images/demo.png"
            alt="Demo of tile extrusion"
            width={861}
            height={487}
            className={classnames(styles.image, styles.demoImage)}
          />
          <p>
            You can read more about the bleeding problem and solution{" "}
            <a
              href="https://web.archive.org/web/20180411151113/http://rotorz.com/unity/tile-system/docs/edge-correction"
              className={styles.link}
            >
              here
            </a>
            . The TLDR is that there are many ways this type of rendering artifact can occur, e.g.
            from pixels being incorrectly blended when the edge of a tile in a tilemap texture is
            rendered.
          </p>
          <h2 className={styles.sectionTitle}>The Solution</h2>
          <p>
            Tile Extruder solves this problem by extruding the edges of each tile outward, creating
            a buffer zone that prevents color bleeding.
          </p>
          <Image
            src="/images/explanation.png"
            alt="Visual explanation of tile extrusion"
            width={200}
            height={200}
            className={classnames(styles.image, styles.explanationImage)}
          />
          <p>
            You can extrude a tileset using this web app, or via the sister command line tool (CLI).
            For more info on the CLI, see the{" "}
            <Link href="https://github.com/sporadic-labs/tile-extruder" className={styles.link}>
              GitHub repository
            </Link>
            .
          </p>
          <h2 className={styles.sectionTitle}>Using an Extruded Tileset</h2>
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
                className={styles.link}
              >
                example
              </Link>
              . You want to load the extruded tileset image, and then when you create your tileset,
              specify the appropriate margin and spacing:
              <pre className={styles.codeBlock}>
                {/* Parameters: name in Tiled, phaser cache key, tile width, tile height, margin, spacing */}
                const tileset = map.addTilesetImage(&quot;tileset&quot;,
                &quot;tileset-extruded&quot;, 48, 48, 1, 2);
              </pre>
            </li>
          </ol>
          <div className={styles.note}>
            <p className={styles.noteText}>
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
